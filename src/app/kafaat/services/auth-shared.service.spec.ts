import { TestBed } from '@angular/core/testing';

import { AuthSharedService } from './auth-shared.service';

describe('AuthSharedService', () => {
  let service: AuthSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
