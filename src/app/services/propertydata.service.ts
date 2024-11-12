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
  public properties = signal<Property[]>([]);

  constructor(private http: HttpClient) {}

  fetchData(): Observable<DataResponse<Property>> {
    const localhost = BackendLocalhost.URL;
    return this.http.get<DataResponse<Property>>(localhost + '/api/properties'); //host should be in an env
  }

  addProperty(property: Property): DataResponse<Property> {
    try {
      this.properties().push(property);

      const successResponse = {
        status: 'success',
        message: 'Property added',
        data: property,
      };
      return successResponse;
    } catch (error) {
      const Response = {
        status: 'unsuccessful',
        message: 'Error occurred',
        data: property,
      };
      return Response;
    }
  }

  updateProperty(updatedProperty: Property): DataResponse<Property> {
    try {
      let index = this.properties().findIndex(
        (element) => element.id == updatedProperty.id
      );
      this.properties().splice(index, 1, updatedProperty);
      const successResponse = {
        status: 'success',
        message: 'Property added',
        data: updatedProperty,
      };
      return successResponse;
    } catch (error) {
      const Response = {
        status: 'unsuccessful',
        message: 'Error occurred',
        data: updatedProperty,
      };
      return Response;
    }
  }
}
