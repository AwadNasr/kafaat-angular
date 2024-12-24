import { TestBed } from '@angular/core/testing';

import { SitePhotosService } from './site-photos.service';

describe('SitePhotosService', () => {
  let service: SitePhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitePhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
