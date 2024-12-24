import { TestBed } from '@angular/core/testing';

import { TypeOfAwardService } from './type-of-award.service';

describe('TypeOfAwardService', () => {
  let service: TypeOfAwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfAwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
