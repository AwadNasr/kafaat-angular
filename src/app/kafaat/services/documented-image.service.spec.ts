import { TestBed } from '@angular/core/testing';

import { DocumentedImageService } from './documented-image.service';

describe('DocumentedImageService', () => {
  let service: DocumentedImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentedImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
