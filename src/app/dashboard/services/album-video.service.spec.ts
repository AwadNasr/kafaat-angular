import { TestBed } from '@angular/core/testing';

import { AlbumVideoService } from './album-video.service';

describe('AlbumVideoService', () => {
  let service: AlbumVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
