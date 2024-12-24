import { TestBed } from '@angular/core/testing';

import { VolunteerFieldParticipantsService } from './volunteer-field-participants.service';

describe('VolunteerFieldParticipantsService', () => {
  let service: VolunteerFieldParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerFieldParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
