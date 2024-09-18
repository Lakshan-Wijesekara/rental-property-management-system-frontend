//Creating a template-driven validation for add-user form
import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../../services/userdata.service';
import { User } from '../../interfaces/user';
import { MessageService } from 'primeng/api';

interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  visible: boolean = false;
  cols!: Column[];

  firstname: string = '';
  lastname: string = '';
  propertyname: string = '';
  email: string = '';
  telephonenumber: string = '';

  constructor(
    private userDataService: UserdataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();

    this.cols = [
      { field: 'firstname', header: 'First Name' },
      { field: 'lastname', header: 'Last Name' },
      { field: 'propertyname', header: 'Property Name' },
      { field: 'email', header: 'Email Address' },
      { field: 'telephonenumber', header: 'Telephone Number' },
    ];
  }

  // users signal from user data service
  getUsers(): User[] {
    return this.userDataService.users();
  }

  addUser(): void {
    const newUser = {
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
    this.visible = true;
  }

  closeDialog(): void {
    this.visible = false;
  }

  onSubmit(): void {
    this.addUser();
  }

  // PRIVATE

  private fetchUsers(): void {
    this.userDataService.fetchData().subscribe((userListFromJSON) => {
      // Set users into the users signal
      this.userDataService.users.set(userListFromJSON);
    });
  }
}
