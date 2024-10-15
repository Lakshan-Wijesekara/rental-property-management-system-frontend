//Creating a template-driven validation for add-user form
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { User } from '../../interfaces/user';
import { UserFeatureComponent } from '../../components/user-features/user-add-view-update-features.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  //Input from the user from search box
  searchText: string = '';
  @ViewChild('userFeature') userFeature: UserFeatureComponent | undefined;

  constructor(private userDataService: UserdataService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  triggerShowDialog() {
    this.userFeature?.showDialog();
  }

  triggerViewUserForm(user: User) {
    this.userFeature?.viewUserForm(user);
  }

  // users signal from user data service
  // If there's a value inside search box the filter runs else all the values will return
  getUsers(searchText: string): User[] {
    if (searchText) {
      let user = this.userDataService
        .users()
        .filter(
          (p) =>
            p.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
            p.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
            p.propertyname.toLowerCase().includes(searchText.toLowerCase()) ||
            p.email.toLowerCase().includes(searchText.toLowerCase()) ||
            p.telephonenumber.toLowerCase().includes(searchText.toLowerCase())
        );
      return user;
    } else {
      return this.userDataService.users();
    }
  }

  // PRIVATE
  private fetchUsers(): void {
    this.userDataService.fetchData().subscribe((userListFromJSON) => {
      // Set users into the users signal
      this.userDataService.users.set(userListFromJSON);
    });
  }
}
