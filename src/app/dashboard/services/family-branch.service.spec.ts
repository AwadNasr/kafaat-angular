import { TestBed } from '@angular/core/testing';

import { FamilyBranchService } from './family-branch.service';

describe('FamilyBranchService', () => {
  let service: FamilyBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
