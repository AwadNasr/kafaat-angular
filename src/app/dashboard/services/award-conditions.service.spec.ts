import { TestBed } from '@angular/core/testing';

import { AwardConditionsService } from './award-conditions.service';

describe('AwardConditionsService', () => {
  let service: AwardConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
