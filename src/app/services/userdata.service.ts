import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { DataResponse } from '../interfaces/data-response';
import { APISubURL } from '../configurations/constants';
import { BackendLocalhost } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private apiUrl = BackendLocalhost.URL;

  constructor(private http: HttpClient) {}

  fetchData(): Observable<DataResponse<User>> {
    return this.http.get<DataResponse<User>>(this.apiUrl + APISubURL.usersURL);
  }

  logUser(user_credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + APISubURL.loginURL, user_credentials);
  }

  addUser(user: User): Observable<any> {
    // Send the data to backend
    return this.http.post(this.apiUrl + APISubURL.usersURL, user);
  }

  updateUser(updatedUser: User, id: string = ''): Observable<any> {
    //Send the updated property to backend
    return this.http.put(
      this.apiUrl + APISubURL.usersURL + '/' + id,
      updatedUser
    );
  }
}
