import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { PropertydataService } from '../../services/propertydata.service';
import { Property } from '../../interfaces/property';
import { PropertyAddViewUpdateFeaturesComponent } from '../../components/property-features/property-add-view-update-features.component';

@Component({
  selector: 'properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent implements OnInit {
  // groupedCities: City[] = [];
  inputValue: string | undefined;
  //Get the input from the property search box
  searchText: string = '';
  @ViewChild('addProperty') addProperty:
    | PropertyAddViewUpdateFeaturesComponent
    | undefined;
  constructor(
    private propertyDataService: PropertydataService // private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchProperties();
  }

  triggerViewMethod(property: Property): void {
    this.addProperty?.viewDialog(property);
  }

  triggerDialog(): void {
    this.addProperty?.showDialog();
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
        );
      return property;
    }
    return this.propertyDataService.properties();
  }

  //PRIVATE
  //Get properties from the properties JSON file
  private fetchProperties(): void {
    this.propertyDataService.fetchData().subscribe((propertyJSON) => {
      this.propertyDataService.properties.set(propertyJSON);
    });
  }
}
