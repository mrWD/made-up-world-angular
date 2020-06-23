import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { TOKEN } from 'src/app/constants/token';

export interface User {
  id: string;
  login: string;
  photo: string;
  followers: { login: string }[];
  followings: { login: string }[];
}

export interface GetUserInfoResponse {
  user: User;
  destination: string;
}

export interface GetUserListResponse {
  page: number;
  pages: number;
  destination: string;
  userList: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  destination = '';
  pageNumber = 1;
  pageCount = 0;
  userInfo: User = null;
  userList: User[] = [];
  newFollowings = [];
  newUnfollowings = [];

  constructor(public http: HttpClient) {}

  getUserInfo(login: string): void {
    this.http.post<GetUserInfoResponse>('/users/user-info', { login })
      .pipe(tap(response => {
        this.userInfo = response.user;
        this.destination = response.destination;
      }))
      .subscribe();
  }

  getUserList(body): void {
    this.http.post<GetUserListResponse>('/users/all', body)
      .pipe(tap(response => {
        this.pageNumber = response.page;
        this.pageCount = response.pages;
        this.destination = response.destination;
        this.userList = response.userList;
      }))
      .subscribe();
  }

  follow(login: string): void {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      return;
    }

    this.http.post('/users/follow', { login }, {
      headers: { Authorization: token },
    })
    .subscribe();
  }

  unfollow(login: string): void {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      return;
    }

    this.http.post('/users/unfollow', { login }, {
      headers: { Authorization: token },
    })
    .subscribe();
  }
}
