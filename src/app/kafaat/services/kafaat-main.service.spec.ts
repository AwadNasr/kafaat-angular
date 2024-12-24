import { TestBed } from '@angular/core/testing';

import { KafaatMainService } from './kafaat-main.service';

describe('KafaatMainService', () => {
  let service: KafaatMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafaatMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
