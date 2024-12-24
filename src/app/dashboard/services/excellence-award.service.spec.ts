import { TestBed } from '@angular/core/testing';

import { ExcellenceAwardService } from './excellence-award.service';

describe('ExcellenceAwardService', () => {
  let service: ExcellenceAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcellenceAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
