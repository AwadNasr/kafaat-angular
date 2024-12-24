import { TestBed } from '@angular/core/testing';

import { MainDashoardService } from './main-dashoard.service';

describe('MainDashoardService', () => {
  let service: MainDashoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainDashoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
