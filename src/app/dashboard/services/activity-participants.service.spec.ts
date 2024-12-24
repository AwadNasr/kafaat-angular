import { TestBed } from '@angular/core/testing';

import { ActivityParticipantsService } from './activity-participants.service';

describe('ActivityParticipantsService', () => {
  let service: ActivityParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
