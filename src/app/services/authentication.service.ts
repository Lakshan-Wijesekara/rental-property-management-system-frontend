import { EnvironmentInjector, Inject, Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Admin } from '../interfaces/admin';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  constructor() {}

  generateToken(person: Admin): string {
    const personData = {
      userName: person.username,
      userEmail: person.email,
      userGender: person.gender,
    };
    const jwtHeader = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const jwtPayload = {
      sub: '12345',
      user: personData,
      exp: Math.floor(Date.now() / 1000) + 10,
      admin: true,
    };

    const stringifiedHeader = CryptoJS.enc.Utf8.parse(
      JSON.stringify(jwtHeader)
    );
    const encodedHeader = CryptoJS.enc.Base64url.stringify(stringifiedHeader);

    const stringifiedPayload = CryptoJS.enc.Utf8.parse(
      JSON.stringify(jwtPayload)
    );
    const encodedPayload = CryptoJS.enc.Base64url.stringify(stringifiedPayload);

    const secretKey = environment.secretKey;

    const token = `${encodedHeader}.${encodedPayload}`;
    const signature = CryptoJS.enc.Base64url.stringify(
      CryptoJS.HmacSHA256(token, secretKey)
    );
    const jwt = `${token}.${signature}`;
    localStorage.setItem('SESSION_TOKEN', jwt);

    return jwt;
  }

  isLoggedIn(): boolean {
    const sessionToken = localStorage.getItem('SESSION_TOKEN');
    if (sessionToken) {
      return true;
    } else {
      return false;
    }
  }

  clearToken(): void {
    localStorage.removeItem('SESSION_TOKEN');
    setTimeout(() => {
      this.router.navigate(['/login']);
    });
  }
}
