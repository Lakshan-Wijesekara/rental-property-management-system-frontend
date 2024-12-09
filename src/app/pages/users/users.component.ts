//Creating a template-driven validation for add-user form
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { User } from '../../interfaces/user';
import { UserAddViewUpdateFeaturesComponent } from '../../components/user-features/user-add-view-update-features.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  //Input from the user from search box
  searchText: string = '';
  users: any[] = [];
  @ViewChild('userFeature') userFeature:
    | UserAddViewUpdateFeaturesComponent
    | undefined;

  constructor(
    private userDataService: UserdataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  triggerShowDialog() {
    this.userFeature?.showDialog();
  }

  triggerViewUserForm(user: User) {
    this.userFeature?.viewUserForm(user);
  }

  // If there's a value inside search box the filter runs else all the values will return
  getUsers(searchText: string): User[] {
    if (searchText) {
      let user = this.users.filter(
        (p) =>
          p.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
          p.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
          p.propertyName.toLowerCase().includes(searchText.toLowerCase()) ||
          p.email.toLowerCase().includes(searchText.toLowerCase()) ||
          p.telephoneNumber.toLowerCase().includes(searchText.toLowerCase())
      );

      return user;
    } else {
      return this.users;
    }
  }

  // PRIVATE
  private fetchUsers(): void {
    this.userDataService.fetchData().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.users = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'An error occurred!',
            detail: 'An unexpected error occurred while retrieving user data',
          });
        }
      },
      error: (error) =>
        this.messageService.add({
          severity: 'error',
          summary: 'An error occurred!',
          detail: error,
        }),
    });
  }
}
