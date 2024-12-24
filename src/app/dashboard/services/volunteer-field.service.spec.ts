import { TestBed } from '@angular/core/testing';

import { VolunteerFieldService } from './volunteer-field.service';

describe('VolunteerFieldService', () => {
  let service: VolunteerFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
