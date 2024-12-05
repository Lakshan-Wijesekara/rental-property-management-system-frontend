import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { DataResponse } from '../interfaces/data-response';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  // since we don't use an API, we use a ng signal to manage state
  public users = signal<User[]>([]);

  constructor(private http: HttpClient) {}

  fetchData(): Observable<User[]> {
    return this.http.get<User[]>('assets/users.json');
  }

  addUser(user: User) {
    try {
      // we can send these data to external API later
      // for now, we update the ng signal
      this.users().push(user);
      const successResponse = {
        status: 'success',
        message: 'User added',
        data: user,
      };
      return successResponse;
    } catch (error) {
      const successResponse = {
        status: 'error',
        message: 'Error while adding user',
        data: user,
      };
      return successResponse;
    }
  }

  updateUser(updatedUser: User) {
    try {
      let index = this.users().findIndex(
        (element) => element.id == updatedUser.id
      );
      this.users().splice(index, 1, updatedUser);
      const response = {
        status: 'success',
        message: 'Property added',
        data: updatedUser,
      };
      return response;
    } catch (error) {
      const errorResponse = {
        status: 'unsuccessful',
        message: 'Error occurred',
        data: updatedUser,
      };
      return errorResponse;
    }
  }
}
