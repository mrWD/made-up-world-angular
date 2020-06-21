import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent implements OnInit {
  constructor(public authService: AuthService, public usersService: UsersService) {}

  isFollowed({ followers }: { followers: { login: string }[] }): boolean {
    if (!this.authService.authInfo || !this.authService.authInfo?.login) {
      return false;
    }

    return followers.every((item) => this.isNotUser(item?.login));
  }

  isNotUser(login: string): boolean {
    return login !== this.authService.authInfo?.login;
  }

  getUserLink(value: string): string {
    return `/user/${value}`;
  }

  getPhotoUrl(value: string): string {
    return `${this.usersService.destination}/${value}`;
  }

  handlePageChange(page) {
    this.usersService.getUserList({ page });
  }

  ngOnInit() {
    this.usersService.getUserList({});
  }
}
