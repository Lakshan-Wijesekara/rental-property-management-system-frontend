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

  addUser(user: User): Observable<any> {
    // Send the data to backend
    return this.http.post(this.apiUrl + '/api/users', user);
  }

  updateUser(updatedUser: User, id: string = ''): Observable<any> {
    //Send the updated property to backend
    return this.http.put(this.apiUrl + '/api/users/' + id, updatedUser);
  }
}
