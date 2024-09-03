//Creating a template-driven validation for add-user form
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  constructor() {}

  onSubmit(userForm: any) {
    return userForm.valid;
  }
}
