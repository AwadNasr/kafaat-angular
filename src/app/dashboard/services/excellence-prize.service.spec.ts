import { TestBed } from '@angular/core/testing';

import { ExcellencePrizeService } from './excellence-prize.service';

describe('ExcellencePrizeService', () => {
  let service: ExcellencePrizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcellencePrizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
