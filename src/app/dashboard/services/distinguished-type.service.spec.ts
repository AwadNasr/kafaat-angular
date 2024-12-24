import { TestBed } from '@angular/core/testing';

import { DistinguishedTypeService } from './distinguished-type.service';

describe('DistinguishedTypeService', () => {
  let service: DistinguishedTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistinguishedTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
