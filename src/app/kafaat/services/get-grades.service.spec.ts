import { TestBed } from '@angular/core/testing';

import { GetGradesService } from './get-grades.service';

describe('GetGradesService', () => {
  let service: GetGradesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGradesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
