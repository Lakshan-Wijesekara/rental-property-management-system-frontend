//Creating a template-driven validation for add-user form
import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { User } from '../../interfaces/user';
import { MessageService } from 'primeng/api';

//Use enum to specify two states
enum propertyVisibility {
  AddProperty = 'addProperty',
  UpdateProperty = 'updateProperty',
}
@Component({
  selector: 'app-users',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  _propertyVisibility = propertyVisibility;
  isAddUserFormvisible: boolean = false;
  firstname: string = '';
  lastname: string = '';
  propertyname: string = '';
  email: string = '';
  telephonenumber: string = '';
  //Input from the user from search box
  searchText: string = '';
  id: number = 0;
  //Assign visibility of add property as default
  currentPropertyProcess: propertyVisibility = propertyVisibility.AddProperty;
  constructor(
    private userDataService: UserdataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  //This method updates the user according to the user inputs from html
  updateUserForm(): void {
    const updatedUser = {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      propertyname: this.propertyname,
      email: this.email,
      telephonenumber: this.telephonenumber,
    };
    this.userDataService.updateUser(updatedUser);
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

  addUser(): void {
    const newUser = {
      id: this.userDataService.users().length + 1,
      firstname: this.firstname,
      lastname: this.lastname,
      propertyname: this.propertyname,
      email: this.email,
      telephonenumber: this.telephonenumber,
    };

    const response = this.userDataService.addUser(newUser);

    if (response.status === 'success') {
      //add toast messages for user
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User added successfully',
      });
      // close dialog when a user is successfully added
      this.closeDialog();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error occurred',
      });
    }
  }

  showDialog(): void {
    this.currentPropertyProcess = propertyVisibility.AddProperty;
    this.isAddUserFormvisible = true;
  }

  viewUserForm(user: User): any {
    this.currentPropertyProcess = propertyVisibility.UpdateProperty;
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.propertyname = user.propertyname;
    this.email = user.email;
    this.telephonenumber = user.telephonenumber;
    this.isAddUserFormvisible = true;
  }

  closeDialog(): void {
    this.isAddUserFormvisible = false;
  }

  //On submit, the method checks if the currentPropertyProcess is similar to add property or update property
  onSubmit(): void {
    if (this.currentPropertyProcess == propertyVisibility.AddProperty) {
      this.addUser();
    } else {
      this.updateUserForm();
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
