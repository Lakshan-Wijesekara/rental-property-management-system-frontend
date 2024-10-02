import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { CitydataService } from '../../services/citydata.service';
import { City } from '../../interfaces/city';
import { PropertydataService } from '../../services/propertydata.service';
import { Property } from '../../interfaces/property';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-properties',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.scss',
})
export class AddPropertyComponent implements OnInit {
  groupedCities: City[] = [];
  inputValue: string | undefined;
  isAddPropertyVisible: boolean = false;
  isViewPropertyVisible: boolean = false;
  dropdownSelectedCity: string = '';
  //Get the input from the property search box
  searchText: string = '';
  selectedProperty!: Property | undefined;

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

  constructor(
    private cityDataService: CitydataService,
    private markerService: MarkerService,
    private propertyDataService: PropertydataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.fetchProperties();
  }

  //Show the pop-up
  showDialog(): void {
    this.isAddPropertyVisible = true;
  }

  //Close the pop-up
  closeDialog(): void {
    this.isAddPropertyVisible = false;
    this.isViewPropertyVisible = false;
  }

  //Passing the property input parameter is a must, to correctly show the updated property in the pop-up map
  viewProperty(property: Property) {
    this.isViewPropertyVisible = true;
    this.selectedProperty = property;
  }

  //When calling the property list, if there's a value in propertySearch box the filter runs
  getProperties(searchText: string): Property[] {
    if (searchText) {
      let property = this.propertyDataService
        .properties()
        .filter(
          (p) =>
            p.selectedCity?.toLowerCase().includes(searchText.toLowerCase()) ||
            p.propertyName?.toLowerCase().includes(searchText.toLowerCase()) ||
            p.propertyArea?.toString().includes(searchText) ||
            p.monthlyRental?.toString().includes(searchText)
            p.selectedCity?.toLowerCase().includes(searchText.toLowerCase()) ||
            p.propertyName?.toLowerCase().includes(searchText.toLowerCase()) ||
            p.propertyArea?.toString().includes(searchText) ||
            p.monthlyRental?.toString().includes(searchText)
        );
      return property;
    }
    return this.propertyDataService.properties();
  }

  //The dropdownSelectedCity is passed to this method from the html and used to find the specific location
  // getPropertyLocation(dropdownSelectedCity: string) {
  //   this.markerService.getMarkerLocation(dropdownSelectedCity).subscribe({
  //     next: (marker) => {
  //       this.selectedPropertyLocation = marker!; //If correct
  //     },
  //     error: (error) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: 'Error occurred' + error,
  //       });
  //     },
  //   });
  // }

  //Add property to the signal
  addProperty(propertyform: FormGroupDirective): void {
    this.propertyShowState = this.propertyVisibility.AddProperty;
    const newProperty = {
      id: this.propertyDataService.properties().length + 1,
      selectedCity: this.dropdownSelectedCity!,
      id: this.propertyDataService.properties().length + 1,
      selectedCity: this.dropdownSelectedCity!,
      propertyName: propertyform.value.propertyName,
      propertyArea: propertyform.value.propertyArea,
      monthlyRental: propertyform.value.monthlyRental,
      // latitude: this.selectedPropertyLocation?.lat,
      // longtitude: this.selectedPropertyLocation?.lng,
    };


    const response = this.propertyDataService.addProperty(newProperty);
    if (response.status === 'success') {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Property added successfully',
      });
      this.closeDialog();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error occurred',
      });
    }
  }

  onSubmit(propertyform: FormGroupDirective, id: number) {
    if (this.propertyShowState == this.propertyVisibility.AddProperty) {
      this.addProperty(propertyform);
    } else if (
      this.propertyShowState == this.propertyVisibility.UpdateProperty
    ) {
      this.updateProperty(propertyform, id);
    }
  }

  //PRIVATE

  //Get properties from the properties JSON file
  //Get properties from the properties JSON file
  private fetchProperties(): void {
    this.propertyDataService.fetchData().subscribe((propertyJSON) => {
      this.propertyDataService.properties.set(propertyJSON);
    });
  }

  //Get cities from the cities JSON file
  private getCities(): void {
    this.cityDataService.fetchCityData().subscribe((groupedCities) => {
      this.groupedCities = groupedCities;
    });
  }

  //Get cities from the cities JSON file
  private getCities(): void {
    this.cityDataService.fetchCityData().subscribe((groupedCities) => {
      this.groupedCities = groupedCities;
    });
  }
}
