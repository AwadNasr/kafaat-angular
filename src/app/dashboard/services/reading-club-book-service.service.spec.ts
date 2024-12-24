import { TestBed } from '@angular/core/testing';

import { ReadingClubBookServiceService } from './reading-club-book-service.service';

describe('ReadingClubBookServiceService', () => {
  let service: ReadingClubBookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingClubBookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
