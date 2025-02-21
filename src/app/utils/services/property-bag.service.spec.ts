import { TestBed } from '@angular/core/testing';

import { PropertyBagService } from './property-bag.service';

describe('PropertyBagService', () => {
  let service: PropertyBagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyBagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
