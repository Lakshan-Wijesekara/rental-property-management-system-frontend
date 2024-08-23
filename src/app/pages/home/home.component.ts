import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);
  loading: unknown;
  constructor(
    private MessageService: MessageService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService
  ) {}

  confirm() {
    this.confirmationService.confirm({
      header: 'Logging Out',
      message: 'Do you want to logout?',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.MessageService.add({
          severity: 'error',
          summary: 'Confirmed',
          detail: 'Logging out!',
          life: 3000,
        });
        this.authenticationService.clearToken();
      },
      reject: () => {
        this.MessageService.add({
          severity: 'success',
          summary: 'Rejected',
          detail: 'You have cancelled!',
          life: 3000,
        });
      },
    });
  }
}
