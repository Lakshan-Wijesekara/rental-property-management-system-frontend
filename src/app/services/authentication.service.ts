import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  generateToken(person: User): string {
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
      exp: Math.floor(Date.now() / 1000) + 3600,
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

    const secretKey =
      'd8399978cc6d9a202f0d2090b4b353891d8350a1fa0664cb8b2c41fa86a5b4b2';

    const token = `${encodedHeader}.${encodedPayload}`;
    const signature = CryptoJS.enc.Base64url.stringify(
      CryptoJS.HmacSHA256(token, secretKey)
    );
    const jwt = `${token}.${signature}`;
    //sign
    console.log('see', jwt);
    localStorage.setItem('SESSION_TOKEN', jwt);

    return jwt;
  }
}
