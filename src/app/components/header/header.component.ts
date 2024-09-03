import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private MessageService: MessageService,
    private confirmationService: ConfirmationService
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

  ngOnInit() {
    this.InitializeData();
  }

  private InitializeData() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/home']),
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Add Property',
            icon: 'pi pi-plus',
            command: () => this.router.navigate(['/add-property']),
          },
          {
            label: 'Add User',
            icon: 'pi pi-user-plus',
            command: () => this.router.navigate(['/add-user']),
          },
        ],
      },
      {
        label: 'User',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
          },
        ],
      },
    ];
  }
}
