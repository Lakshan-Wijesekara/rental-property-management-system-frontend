import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  map!: google.maps.Map;
  marker!: google.maps.Marker;

  @Input() lat: number = 0;
  @Input() lng: number = 0;

  @ViewChild('map', { static: false })
  mapElement!: ElementRef;

  ngAfterViewInit(): void {
    this.mapInit(this.lat, this.lng);
  }

  //Added a timeout here, otherwise the Afterviewinit is trying to load the map and output an error
  ngOnChanges() {
    setTimeout(() => {
      this.mapInit(this.lat, this.lng);
    }, 1);
  }

  //The function to load the google map API and adding a marker
  mapInit(lat: number, lng: number) {
    let location = new google.maps.LatLng(lat, lng);
    this.map = new google.maps.Map(this.mapElement?.nativeElement, {
      center: location,
      zoom: 12,
    });
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
  }
}
