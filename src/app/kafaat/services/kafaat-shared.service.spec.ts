import { TestBed } from '@angular/core/testing';

import { KafaatSharedService } from './kafaat-shared.service';

describe('KafaatSharedService', () => {
  let service: KafaatSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KafaatSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
