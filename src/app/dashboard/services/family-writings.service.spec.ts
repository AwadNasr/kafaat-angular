import { TestBed } from '@angular/core/testing';

import { FamilyWritingsService } from './family-writings.service';

describe('FamilyWritingsService', () => {
  let service: FamilyWritingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyWritingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
