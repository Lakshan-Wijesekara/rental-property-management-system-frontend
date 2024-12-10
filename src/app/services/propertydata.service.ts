import { Injectable } from '@angular/core';
import { Property } from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from '../interfaces/data-response';
import { APISubURL } from '../configurations/constants';
import { BackendLocalhost } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertydataService {
  private apiUrl = BackendLocalhost.URL;

  constructor(private http: HttpClient) {}

  fetchData(): Observable<DataResponse<Property>> {
    return this.http.get<DataResponse<Property>>(
      this.apiUrl + APISubURL.propertiesURL
    );
  }

  addProperty(property: Property): Observable<any> {
    return this.http.post(this.apiUrl + APISubURL.propertiesURL, property);
  }

  updateProperty(updatedProperty: Property, id: String = ''): Observable<any> {
    return this.http.put(
      this.apiUrl + APISubURL.propertiesURL + '/' + id,
      updatedProperty
    );
  }

  deactivateProperty(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + APISubURL.propertiesURL + '/' + id);
  }
}
