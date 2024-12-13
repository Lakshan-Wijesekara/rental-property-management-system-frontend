import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EncryptionService } from '../../services/encryption.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = ''; //entered username by user
  password: string = ''; //entered password by user
  users: User[] = [];
  loading: boolean = false;

  constructor(
    private dataService: UserdataService,
    private router: Router,
    private messageService: MessageService,
    private encryptionService: EncryptionService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  async traceUser(): Promise<void> {
    //Find the person from username
    this.loading = false;
    if (this.username === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Please Enter a Username!',
        detail: 'Username is required',
        key: 'tr',
      });
      return;
    }
    if (this.password === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Please Enter a Password!',
        detail: 'Password is required',
        key: 'tr',
      });
      return;
    }

    const generatedToken = this.authenticationService.getToken(
      this.username,
      this.password
    );

    if (await generatedToken) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
