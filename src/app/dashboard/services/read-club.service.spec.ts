import { TestBed } from '@angular/core/testing';

import { ReadClubService } from './read-club.service';

describe('ReadClubService', () => {
  let service: ReadClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
