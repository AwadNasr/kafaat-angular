import { TestBed } from '@angular/core/testing';

import { VolunteerReportService } from './volunteer-report.service';

describe('VolunteerReportService', () => {
  let service: VolunteerReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
