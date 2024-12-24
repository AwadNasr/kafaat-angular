import { TestBed } from '@angular/core/testing';

import { GetAveragesService } from './get-averages.service';

describe('GetAveragesService', () => {
  let service: GetAveragesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAveragesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
