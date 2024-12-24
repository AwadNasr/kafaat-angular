import { TestBed } from '@angular/core/testing';

import { AtandardTypesService } from './atandard-types.service';

describe('AtandardTypesService', () => {
  let service: AtandardTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtandardTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
