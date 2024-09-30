import { Injectable, signal } from '@angular/core';
import { Property } from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from '../interfaces/data-response';

@Injectable({
  providedIn: 'root',
})
export class PropertydataService {
  //wrap the properties variable with angular signal
  public properties = signal<Property[]>([]);

  constructor(private http: HttpClient) {}

  fetchData(): Observable<Property[]> {
    return this.http.get<Property[]>('assets/properties.json');
  }

  addProperty(property: Property): DataResponse {
    try {
      this.properties().push(property);

      const successResponse = {
        status: 'success',
        message: 'Property added',
        data: property,
      };
      return successResponse;
    } catch (error) {
      const successResponse = {
        status: 'unsuccessful',
        message: 'Error occurred',
        data: property,
      };
      return successResponse;
    }
  }

  updateProperty(updatedProperty: Property) {
    this.properties().forEach((element, index) => {
      if (element.id == updatedProperty.id) {
        this.properties().splice(index, 1, updatedProperty);
      }
    });
  }
}
