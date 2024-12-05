import { Injectable, signal } from '@angular/core';
import { Property } from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from '../interfaces/data-response';
import { BackendLocalhost } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertydataService {
  //wrap the properties variable with angular signal
  // public properties = signal<Property[]>([]);
  private apiUrl = BackendLocalhost.URL;

  constructor(private http: HttpClient) {}

  fetchData(): Observable<DataResponse<Property>> {
    return this.http.get<DataResponse<Property>>(
      this.apiUrl + '/api/properties'
    ); //host should be in an env
  }

  addProperty(property: Property): Observable<any> {
    return this.http.post(this.apiUrl + '/api/properties', property);
  }

  updateProperty(updatedProperty: Property, id: String = ''): Observable<any> {
    return this.http.put(
      this.apiUrl + '/api/properties/' + id,
      updatedProperty
    );
  }
}
