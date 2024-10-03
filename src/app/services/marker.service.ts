import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Marker } from '../interfaces/marker';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(private http: HttpClient) {}

  fetchMarkerLocations(): Observable<Marker[]> {
    return this.http.get<Marker[]>('assets/markers.json');
  }

  getMarkerLocation(city: string): Observable<Marker | undefined> {
    return this.fetchMarkerLocations().pipe(
      map((markers: Marker[]) =>
        markers.find((marker) => marker.id.toLowerCase() === city.toLowerCase())
      ),
      catchError((error) => {
        // Handle errors
        console.error('Error fetching marker locations:', error);
        return of(undefined);
      })
    );
  }
}
