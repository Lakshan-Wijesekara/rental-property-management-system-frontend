import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddViewUpdateFeaturesComponent } from './user-add-view-update-features.component';

describe('UserFeatureComponent', () => {
  let component: UserAddViewUpdateFeaturesComponent;
  let fixture: ComponentFixture<UserAddViewUpdateFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAddViewUpdateFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddViewUpdateFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
