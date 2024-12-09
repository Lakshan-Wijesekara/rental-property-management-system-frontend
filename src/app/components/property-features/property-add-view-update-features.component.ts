import { Component, OnInit } from '@angular/core';
import { Marker } from '../../interfaces/marker';
import { MarkerService } from '../../services/marker.service';
import { Property } from '../../interfaces/property';
import { CitydataService } from '../../services/citydata.service';
import { PropertydataService } from '../../services/propertydata.service';
import { MessageService } from 'primeng/api';
import { City } from '../../interfaces/city';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

enum propertyState {
  AddProperty = 'addProperty',
  UpdateProperty = 'updateProperty',
}
@Component({
  selector: 'property-add-view-update-features',
  templateUrl: './property-add-view-update-features.component.html',
  styleUrl: './property-add-view-update-features.component.scss',
})
export class PropertyAddViewUpdateFeaturesComponent implements OnInit {
  isPropertyFormVisible: boolean = false;
  propertyVisibility = propertyState;
  propertyShowState: propertyState = propertyState.AddProperty;
  dropdownSelectedCity: string | undefined;
  selectedLocation!: Marker | undefined;
  selectedProperty!: Property;
  groupedCities: City[] = [];
  defaultLatitude: number = 6.9271;
  defaultLongtitude: number = 79.8612;

  reactiveForm: FormGroup = new FormGroup({
    propertyName: new FormControl('', [Validators.required]),
    propertyArea: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]),
    monthlyRental: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]),
  });

  constructor(
    private cityDataService: CitydataService,
    private markerService: MarkerService,
    private propertyDataService: PropertydataService,
    private messageService: MessageService
  ) {}

  get propertyName() {
    return this.reactiveForm.get('propertyName');
  }

  set propertyName(value: any) {
    this.reactiveForm.get('propertyName')?.setValue(value);
  }

  get propertyArea() {
    return this.reactiveForm.get('propertyArea');
  }

  set propertyArea(value: any) {
    this.reactiveForm.get('propertyArea')?.setValue(value);
  }

  get monthlyRental() {
    return this.reactiveForm.get('monthlyRental');
  }

  set monthlyRental(value: any) {
    this.reactiveForm.get('monthlyRental')?.setValue(value);
  }

  ngOnInit(): void {
    this.getCities();
  }

  selectedLatitude(): number {
    return this.selectedLocation?.lat || this.defaultLatitude;
  }

  selectedLongtitude(): number {
    return this.selectedLocation?.lng || this.defaultLongtitude;
  }

  selectedPropertyLatitude(): number {
    return this.selectedProperty?.latitude!;
  }

  selectedPropertyLongtitude(): number {
    return this.selectedProperty?.longtitude!;
  }

  //Close the pop-up
  closeDialog(): void {
    this.isPropertyFormVisible = false;
    this.clearFormData();
  }

  //Show the pop-up
  showDialog(): void {
    this.propertyShowState = this.propertyVisibility.AddProperty;
    this.isPropertyFormVisible = true;
  }

  getPropertyLocation(dropdownSelectedCity: string | undefined): void {
    this.markerService.getMarkerLocation(dropdownSelectedCity!).subscribe({
      next: (marker) => {
        if (this.propertyShowState == this.propertyVisibility.AddProperty) {
          this.selectedLocation = marker!;
        } else {
          this.selectedProperty.longtitude = marker?.lng;
          this.selectedProperty.latitude = marker?.lat;
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error occurred' + error,
        });
      },
    });
  }

  //Add property to the database
  addProperty(propertyform: FormGroupDirective): void {
    this.propertyShowState = this.propertyVisibility.AddProperty;
    const newProperty: Property = {
      selectedCity: this.dropdownSelectedCity!,
      propertyName: propertyform.value.propertyName,
      propertyArea: propertyform.value.propertyArea,
      monthlyRental: propertyform.value.monthlyRental,
      latitude: this.selectedLocation?.lat,
      longtitude: this.selectedLocation?.lng,
    };

    this.propertyDataService.addProperty(newProperty).subscribe({
      next: (response) => {
        if (response.status === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this.closeDialog();
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      },
    });
  }

  //View property will assign the values according to changes in the DOM
  viewDialog(property: Property): void {
    this.propertyShowState = this.propertyVisibility.UpdateProperty;
    this.selectedProperty = property;
    this.fillFormData();
    this.isPropertyFormVisible = true;
  }

  fillFormData(): void {
    this.dropdownSelectedCity = this.selectedProperty.selectedCity;
    this.propertyName = this.selectedProperty.propertyName;
    this.propertyArea = this.selectedProperty.propertyArea;
    this.monthlyRental = this.selectedProperty.monthlyRental;
  }

  clearFormData(): void {
    this.dropdownSelectedCity = '';
    this.propertyName = '';
    this.propertyArea = '';
    this.monthlyRental = '';
  }

  onSubmit(propertyform: FormGroupDirective): void {
    if (this.propertyShowState == this.propertyVisibility.AddProperty) {
      this.addProperty(propertyform);
    } else if (
      this.propertyShowState == this.propertyVisibility.UpdateProperty
    ) {
      this.updateProperty(propertyform);
    }
  }

  //To update the property with a new value
  updateProperty(propertyform: FormGroupDirective): void {
    const updatedProperty = {
      selectedCity: this.dropdownSelectedCity!,
      propertyName: propertyform.value.propertyName,
      propertyArea: propertyform.value.propertyArea,
      monthlyRental: propertyform.value.monthlyRental,
      latitude: this.selectedProperty?.latitude,
      longtitude: this.selectedProperty?.longtitude,
    };

    this.propertyDataService
      .updateProperty(updatedProperty, this.selectedProperty._id)
      .subscribe({
        next: (response) => {
          if (response.status) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
            });
            this.closeDialog();
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        },
      });
  }

  //Get cities from the cities JSON file
  private getCities(): void {
    this.cityDataService.fetchCityData().subscribe((groupedCities) => {
      this.groupedCities = groupedCities;
    });
  }
}
