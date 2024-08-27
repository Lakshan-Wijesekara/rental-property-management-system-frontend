import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { CitydataService } from '../../services/citydata.service';
import { City } from '../../interfaces/city';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.scss',
})
export class AddPropertyComponent implements OnInit {
  groupedCities: City[] = [];
  inputValue: string | undefined;

  reactiveForm: FormGroup = new FormGroup({
    selectedCity: new FormControl(''),
    propertyName: new FormControl(''),
    propertyArea: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    monthlyRental: new FormControl(''),
  });

  ngOnInit(): void {
    this.getCities();
  }

  constructor(private cityDataService: CitydataService) {}

  getCities(): void {
    this.cityDataService.fetchCityData().subscribe((groupedCities) => {
      this.groupedCities = groupedCities;
    });
  }
}
