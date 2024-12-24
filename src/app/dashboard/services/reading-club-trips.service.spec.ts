import { TestBed } from '@angular/core/testing';

import { ReadingClubTripsService } from './reading-club-trips.service';

describe('ReadingClubTripsService', () => {
  let service: ReadingClubTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingClubTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
