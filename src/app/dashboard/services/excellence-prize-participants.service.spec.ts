import { TestBed } from '@angular/core/testing';

import { ExcellencePrizeParticipantsService } from './excellence-prize-participants.service';

describe('ExcellencePrizeParticipantsService', () => {
  let service: ExcellencePrizeParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcellencePrizeParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
