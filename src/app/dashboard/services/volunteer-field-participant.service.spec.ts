import { TestBed } from '@angular/core/testing';

import { VolunteerFieldParticipantService } from './volunteer-field-participant.service';

describe('VolunteerFieldParticipantService', () => {
  let service: VolunteerFieldParticipantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerFieldParticipantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
