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

  closeDialog() {
    this.visible = false;
  }

  getCities(): void {
    this.cityDataService.fetchCityData().subscribe((groupedCities) => {
      this.groupedCities = groupedCities;
    });
  }

  getProperties(): Property[] {
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
