import { TestBed } from '@angular/core/testing';

import { PropertydataService } from './propertydata.service';

describe('PropertydataService', () => {
  let service: PropertydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
