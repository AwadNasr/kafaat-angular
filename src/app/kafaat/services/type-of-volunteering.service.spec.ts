import { TestBed } from '@angular/core/testing';

import { TypeOfVolunteeringService } from './type-of-volunteering.service';

describe('TypeOfVolunteeringService', () => {
  let service: TypeOfVolunteeringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfVolunteeringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
