import { TestBed } from '@angular/core/testing';

import { ExcellenceContentService } from './excellence-content.service';

describe('ExcellenceContentService', () => {
  let service: ExcellenceContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcellenceContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
