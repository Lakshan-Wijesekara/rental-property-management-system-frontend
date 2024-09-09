//Creating a template-driven validation for add-user form
import { Component } from '@angular/core';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  firstname: string = '';
  lastname: string = '';
  propertyname: string = '';
  email: string = '';
  telephonenumber: string = '';
  visible: boolean = false;

  constructor() {}

  showDialog() {
    this.visible = true;
  }

  onSubmit(userForm: any) {
    return userForm.valid;
  }
}
