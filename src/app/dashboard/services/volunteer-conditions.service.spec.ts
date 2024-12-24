import { TestBed } from '@angular/core/testing';

import { VolunteerConditionsService } from './volunteer-conditions.service';

describe('VolunteerConditionsService', () => {
  let service: VolunteerConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
