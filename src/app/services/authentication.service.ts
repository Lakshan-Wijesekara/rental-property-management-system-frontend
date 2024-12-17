import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from './userdata.service';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);

  constructor(
    private userDataService: UserdataService,
    private messageService: MessageService
  ) {}

  getToken(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const user_credentials = {
        username: username,
        password: password,
      };
      this.userDataService.logUser(user_credentials).subscribe({
        next: (response) => {
          if (response) {
            const userToken = response.data;
            localStorage.setItem('Session_Token', userToken);
            resolve(userToken);
          } else {
            reject('Invalid response');
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed!',
            detail: 'Please input correct credentials',
            key: 'tr',
          });
          reject(error);
        },
      });
    });
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  isLoggedIn(): boolean {
    const sessionToken = localStorage.getItem('Session_Token');
    if (sessionToken) {
      const decodedToken = this.decodeToken(sessionToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < decodedToken.exp) {
        return true;
      }
    }
    return false;
  }

  clearToken(): void {
    localStorage.removeItem('Session_Token');
    this.router.navigate(['/login']);
  }
}
