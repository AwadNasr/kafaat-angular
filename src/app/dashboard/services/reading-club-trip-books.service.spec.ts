import { TestBed } from '@angular/core/testing';

import { ReadingClubTripBooksService } from './reading-club-trip-books.service';

describe('ReadingClubTripBooksService', () => {
  let service: ReadingClubTripBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingClubTripBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
