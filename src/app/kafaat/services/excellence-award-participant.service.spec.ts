import { TestBed } from '@angular/core/testing';

import { ExcellenceAwardParticipantService } from './excellence-award-participant.service';

describe('ExcellenceAwardParticipantService', () => {
  let service: ExcellenceAwardParticipantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcellenceAwardParticipantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
