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
  visible: boolean = false;
  view: boolean = false;

  //Get the input from the property search box
  searchText: string = '';

  reactiveForm: FormGroup = new FormGroup({
    selectedCity: new FormControl('', [Validators.required]),
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

  get selectedCity() {
    return this.reactiveForm.get('selectedCity');
  }

  set selectedCity(value: any) {
    this.reactiveForm.get('selectedCity')?.setValue(value);
  }

  get propertyName() {
    return this.reactiveForm.get('propertyName');
  }

  set propertyName(value: any) {
    this.reactiveForm.get('propertyName')?.setValue(value);
  }

  get propertyArea() {
    return this.reactiveForm.get('propertyName');
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

  // updateForm(propertyform: FormGroupDirective) {
  //   this.selectedCity = propertyform.value.selectedCity;
  //   this.propertyName = propertyform.value.propertyName;
  //   this.propertyArea = propertyform.value.propertyArea;
  //   this.monthlyRental = propertyform.value.monthlyRental;
  // }
  constructor(
    private cityDataService: CitydataService,
    private propertyDataService: PropertydataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.fetchProperties();
  }

  showDialog() {
    this.visible = true;
  }

  updateProperty(updateForm: FormGroupDirective): void {
    const updatedProperty = {
      selectedCity: updateForm.value.selectedCity,
      propertyName: updateForm.value.propertyName,
      propertyArea: updateForm.value.propertyArea,
      monthlyRental: updateForm.value.monthlyRental,
    };
    return this.propertyDataService.updateProperty(updatedProperty);
  }

  viewDialog(property: Property) {
    this.view = true;
    this.selectedCity = property.selectedCity;
    this.propertyName = property.propertyName;
    this.propertyArea = property.propertyArea;
    this.monthlyRental = property.monthlyRental;
  }

  closeDialog() {
    this.visible = false;
  }

  getCities(): void {
    this.cityDataService.fetchCityData().subscribe((groupedCities) => {
      this.groupedCities = groupedCities;
    });
  }

  //When calling the property list, if there's a value in propertySearch box the filter runs
  getProperties(searchText: string): Property[] {
    if (searchText) {
      let property = this.propertyDataService
        .properties()
        .filter(
          (p) =>
            p.selectedCity.toLowerCase().includes(searchText.toLowerCase()) ||
            p.propertyName.toLowerCase().includes(searchText.toLowerCase()) ||
            p.propertyArea.toString().includes(searchText) ||
            p.monthlyRental.toString().includes(searchText)
        );
      return property;
    }
    return this.propertyDataService.properties();
  }

  addProperty(propertyform: FormGroupDirective): void {
    const newProperty = {
      selectedCity: propertyform.value.selectedCity,
      propertyName: propertyform.value.propertyName,
      propertyArea: propertyform.value.propertyArea,
      monthlyRental: propertyform.value.monthlyRental,
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

  //PRIVATE

  private fetchProperties(): void {
    this.propertyDataService.fetchData().subscribe((propertyJSON) => {
      this.propertyDataService.properties.set(propertyJSON);
    });
  }
}
