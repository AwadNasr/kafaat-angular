import { TestBed } from '@angular/core/testing';

import { KafaatFounderService } from './kafaat-founder.service';

describe('KafaatFounderService', () => {
  let service: KafaatFounderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafaatFounderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
