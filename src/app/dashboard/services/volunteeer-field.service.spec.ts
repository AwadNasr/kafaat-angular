import { TestBed } from '@angular/core/testing';

import { VolunteeerFieldService } from './volunteeer-field.service';

describe('VolunteeerFieldService', () => {
  let service: VolunteeerFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteeerFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
