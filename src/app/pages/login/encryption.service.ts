import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor() {}

  encryptPassword(password: string): string {
    return CryptoJS.SHA1(password).toString();
  }

  decryptPassword(encryptedPassword: string): string {
    const bytes = CryptoJS.SHA1(encryptedPassword);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  comparePassword(
    enteredPassword: string,
    actualPassword: string = ''
  ): boolean {
    const encyptedPassword = this.encryptPassword(enteredPassword);
    if (encyptedPassword === actualPassword) {
      return true;
    }
    return false;
  }
}
