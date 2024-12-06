import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { DataResponse } from '../interfaces/data-response';
import { BackendLocalhost } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private apiUrl = BackendLocalhost.URL;

  constructor(private http: HttpClient) {}

  fetchData(): Observable<DataResponse<User>> {
    return this.http.get<DataResponse<User>>(this.apiUrl + '/api/users');
  }

  addUser(user: User) {
    try {
      // we can send these data to external API later
      // for now, we update the ng signal
      this.http.post(this.apiUrl, user);
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

  updateUser(updatedUser: User, id: string = '') {
    try {
      // let index = this.users().findIndex(
      //   (element) => element.id == updatedUser.id
      // );
      this.http.put(this.apiUrl + '/' + id, updatedUser);
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
