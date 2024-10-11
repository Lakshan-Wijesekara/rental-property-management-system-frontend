import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFeatureComponent } from './property-feature.component';

describe('AddPropertyComponent', () => {
  let component: PropertyFeatureComponent;
  let fixture: ComponentFixture<PropertyFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
