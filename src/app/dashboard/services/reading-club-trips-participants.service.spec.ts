import { TestBed } from '@angular/core/testing';

import { ReadingClubTripsParticipantsService } from './reading-club-trips-participants.service';

describe('ReadingClubTripsParticipantsService', () => {
  let service: ReadingClubTripsParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingClubTripsParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
