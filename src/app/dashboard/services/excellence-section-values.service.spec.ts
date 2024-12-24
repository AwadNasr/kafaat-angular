import { TestBed } from '@angular/core/testing';

import { ExcellenceSectionValuesService } from './excellence-section-values.service';

describe('ExcellenceSectionValuesService', () => {
  let service: ExcellenceSectionValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcellenceSectionValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
