import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  items: MenuItem[] = [];
  activeItem: MenuItem = [];

  // ngOnInit(): void {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
          },
        ],
      },
    ];
    this.items = [
      { label: 'Profile', icon: 'pi pi-home' },
      { label: 'Transactions', icon: 'pi pi-chart-line' },
      { label: 'Properties', icon: 'pi pi-building' },
      { label: 'Messages', icon: 'pi pi-bell' },
    ];
    this.activeItem = this.items[0];
  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
