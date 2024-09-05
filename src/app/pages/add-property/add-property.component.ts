import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  visible: boolean = false;

  reactiveForm: FormGroup = new FormGroup({
    selectedCity: new FormControl('', [Validators.required]),
    propertyName: new FormControl('', [Validators.required]),
    propertyArea: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]),
    monthlyRental: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getCities();
  }

  showDialog() {
    this.visible = true;
  }

  onAdd(propertyForm: any) {
    return propertyForm.valid;
  }

  constructor(private cityDataService: CitydataService) {}

  getCities(): void {
    this.cityDataService.fetchCityData().subscribe((groupedCities) => {
      this.groupedCities = groupedCities;
    });
  }
}
