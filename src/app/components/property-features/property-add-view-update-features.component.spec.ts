import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddViewUpdateFeaturesComponent } from './property-add-view-update-features.component';

describe('AddPropertyComponent', () => {
  let component: PropertyAddViewUpdateFeaturesComponent;
  let fixture: ComponentFixture<PropertyAddViewUpdateFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyAddViewUpdateFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyAddViewUpdateFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
