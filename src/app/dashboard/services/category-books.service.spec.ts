import { TestBed } from '@angular/core/testing';

import { CategoryBooksService } from './category-books.service';

describe('CategoryBooksService', () => {
  let service: CategoryBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
