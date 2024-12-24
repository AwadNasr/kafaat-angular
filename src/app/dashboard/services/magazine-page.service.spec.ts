import { TestBed } from '@angular/core/testing';

import { MagazinePageService } from './magazine-page.service';

describe('MagazinePageService', () => {
  let service: MagazinePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagazinePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
