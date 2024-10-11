import { Component } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';

//Use enum to specify two states
enum propertyVisibility {
  AddProperty = 'addProperty',
  UpdateProperty = 'updateProperty',
}
@Component({
  selector: 'app-user-feature',
  templateUrl: './user-feature.component.html',
  styleUrl: './user-feature.component.scss',
})
export class UserFeatureComponent {
  _propertyVisibility = propertyVisibility;
  isAddUserFormvisible: boolean = false;
  firstname: string = '';
  lastname: string = '';
  propertyname: string = '';
  email: string = '';
  telephonenumber: string = '';
  id: number = 0;
  selectedUser!: User;
  currentPropertyProcess: propertyVisibility = propertyVisibility.AddProperty;

  constructor(
    private userDataService: UserdataService,
    private messageService: MessageService
  ) {}

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
    this.clearUserForm();
    this.isAddUserFormvisible = true;
  }

  closeDialog(): void {
    this.isAddUserFormvisible = false;
  }

  viewUserForm(user: User): any {
    this.currentPropertyProcess = propertyVisibility.UpdateProperty;
    this.selectedUser = user;
    this.fillUserForm();
    this.isAddUserFormvisible = true;
  }

  fillUserForm(): void {
    this.id = this.selectedUser.id || 0;
    this.firstname = this.selectedUser.firstname;
    this.lastname = this.selectedUser.lastname;
    this.propertyname = this.selectedUser.propertyname;
    this.email = this.selectedUser.email;
    this.telephonenumber = this.selectedUser.telephonenumber;
  }

  clearUserForm(): void {
    this.id = 0;
    this.firstname = '';
    this.lastname = '';
    this.propertyname = '';
    this.email = '';
    this.telephonenumber = '';
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

  //On submit, the method checks if the currentPropertyProcess is similar to add property or update property
  onSubmit(): void {
    if (this.currentPropertyProcess == propertyVisibility.AddProperty) {
      this.addUser();
    } else {
      this.updateUserForm();
    }
  }
}
