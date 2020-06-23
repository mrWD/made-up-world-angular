import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { TOKEN } from 'src/app/constants/token';

export interface AuthInfo {
  login: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = localStorage.getItem(TOKEN);
  authInfo: AuthInfo | null = null;

  constructor(private http: HttpClient) {}

  getAuthInfo(): void {
    const token = localStorage.getItem(TOKEN);

    if (!token) {
      return;
    }

    this.http.get<AuthInfo>(`${environment.API_URL}/auth`, {
      headers: { Authorization: token },
    })
      .pipe(tap(response => {
        this.authInfo = response;
      }))
      .subscribe();
  }

  signUp(body): void {
    this.http.post<{ token: string }>(`${environment.API_URL}/auth/signup`, body)
      .pipe(tap(response => {
        if (response.token) {
          localStorage.setItem(TOKEN, response.token);

          this.getAuthInfo();
        }
      }))
      .subscribe();
  }

  signIn(body): void {
    this.http.post<{ token: string }>(`${environment.API_URL}/auth/signin`, body)
      .pipe(tap(response => {
        if (response.token) {
          localStorage.setItem(TOKEN, response.token);

          this.getAuthInfo();
        }
      })).subscribe();
  }

  signOut(): void {
    this.token = null;
    this.authInfo = null;

    localStorage.removeItem(TOKEN);
  }
}
