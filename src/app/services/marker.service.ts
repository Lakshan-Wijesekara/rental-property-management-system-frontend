import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Marker } from '../interfaces/marker';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

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
        this.messageService.add({
          severity: 'error',
          summary: 'An error occurred!',
          detail: 'A system error occurred!',
        });
        return of(undefined);
      })
    );
  }
}
