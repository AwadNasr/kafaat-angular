import { TestBed } from '@angular/core/testing';

import { JsCssLoaderService } from './js-css-loader.service';

describe('JsCssLoaderService', () => {
  let service: JsCssLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsCssLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
