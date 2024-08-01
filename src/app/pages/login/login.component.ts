import { Component, OnInit } from '@angular/core';
import { DataService } from './userdata.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { MessageService } from 'primeng/api';
import { EncryptionService } from './encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName: string = ''; //entered username by user
  password: string = ''; //entered password by user
  users: User[] = [];
  loading: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {}

  traceData(): void {
    this.loading = true;
    this.dataService.fetchData().subscribe(
      (users) => {
        this.users = users;
        this.traceUser();
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'User not found!',
          detail: 'A system error occured',
          key: 'tr',
        });
        console.error('User not found', error);
      }
    );
  }

  //PRIVATE

  private traceUser(): void {
    //Find the person from username
    this.loading = false;
    if (this.userName === '') {
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
    const person = this.users.find(
      (user: User) => user.username === this.userName
    );
    //Compare the passwords
    if (
      this.encryptionService.comparePassword(this.password, person?.password)
    ) {
      this.router.navigate(['/home']);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed!',
        detail: 'Please input correct credentials',
        key: 'tr',
      });
    }
  }
}
