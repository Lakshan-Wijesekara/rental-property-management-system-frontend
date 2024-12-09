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
  selector: 'user-add-view-update-features',
  templateUrl: './user-add-view-update-features.component.html',
  styleUrl: './user-add-view-update-features.component.scss',
})
export class UserAddViewUpdateFeaturesComponent {
  _propertyVisibility = propertyVisibility;
  isAddUserFormvisible: boolean = false;
  firstname?: string;
  lastname?: string;
  propertyName?: string;
  email?: string;
  telephoneNumber?: number;
  id: number = 0;
  selectedUser!: User;
  currentPropertyProcess: propertyVisibility = propertyVisibility.AddProperty;

  constructor(
    private userDataService: UserdataService,
    private messageService: MessageService
  ) {}

  addUser(): void {
    const newUser = this.createUserObject();
    this.userDataService.addUser(newUser).subscribe({
      next: (response) => {
        if (response.status == true) {
          this.messageService.add({
            severity: 'success',
            summary: 'User added successfully!',
            detail: response.message,
          });
          this.closeDialog();
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'An error occurred!',
          detail: error.error.message,
        });
      },
    });
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
    this.firstname = this.selectedUser.firstname;
    this.lastname = this.selectedUser.lastname;
    this.propertyName = this.selectedUser.propertyName;
    this.email = this.selectedUser.email;
    this.telephoneNumber = this.selectedUser.telephoneNumber;
  }

  clearUserForm(): void {
    this.id = 0;
    this.firstname = '';
    this.lastname = '';
    this.propertyName = '';
    this.email = '';
    this.telephoneNumber = 0;
  }

  //This method updates the user according to the user inputs from html
  updateUserForm(): void {
    const updatedUser = this.createUserObject();
    this.userDataService
      .updateUser(updatedUser, this.selectedUser._id)
      .subscribe({
        next: (response) => {
          if (response.status == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'User updated successfully!',
              detail: response.message,
            });
            this.closeDialog();
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        },
      });
  }

  //On submit, the method checks if the currentPropertyProcess is similar to add property or update property
  onSubmit(): void {
    if (this.currentPropertyProcess == propertyVisibility.AddProperty) {
      this.addUser();
    } else {
      this.updateUserForm();
    }
  }

  //PRIVATE
  private createUserObject(): User {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      propertyName: this.propertyName,
      email: this.email,
      telephoneNumber: this.telephoneNumber,
    };
  }
}
