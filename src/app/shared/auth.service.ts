import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface AuthInfo {
  login: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = localStorage.getItem('TOKEN');
  authInfo: AuthInfo | null = null;

  constructor(private http: HttpClient) {}

  getAuthInfo(): void {
    const token = localStorage.getItem('TOKEN');

    if (!token) {
      return;
    }

    this.http.get<AuthInfo>('https://made-up-world-nodejs.herokuapp.com/api/auth', {
      headers: { Authorization: token },
    })
      .pipe(tap(response => {
        this.authInfo = response;
      }))
      .subscribe();
  }

  signUp(body): void {
    this.http.post<{ token: string }>('https://made-up-world-nodejs.herokuapp.com/api/auth/signup', body)
      .pipe(tap(response => {
        if (response.token) {
          localStorage.setItem('TOKEN', response.token);

          this.getAuthInfo();
        }
        // const formData = new FormData();

        // formData.append('userId', response);
        // formData.append('file', body.file);

        // this.http.post('https://made-up-world-nodejs.herokuapp.com/api/upload/image', formData, {
        //   headers: {
        //     'Content-type': 'multipart/form-data; charset=utf8;',
        //   },
        // });
      }))
      .subscribe();
  }

  signIn(body): void {
    this.http.post<{ token: string }>('https://made-up-world-nodejs.herokuapp.com/api/auth/signin', body)
      .pipe(tap(response => {
        if (response.token) {
          localStorage.setItem('TOKEN', response.token);

          this.getAuthInfo();
        }
      })).subscribe();
  }

  signOut(): void {
    this.token = null;
    this.authInfo = null;

    localStorage.removeItem('TOKEN');
  }
}
