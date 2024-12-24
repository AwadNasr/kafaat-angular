import { TestBed } from '@angular/core/testing';

import { ExcellencePrizeReportService } from './excellence-prize-report.service';

describe('ExcellencePrizeReportService', () => {
  let service: ExcellencePrizeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcellencePrizeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
