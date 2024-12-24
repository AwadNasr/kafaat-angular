import { TestBed } from '@angular/core/testing';

import { AlbumPhotosService } from './album-photos.service';

describe('AlbumPhotosService', () => {
  let service: AlbumPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
