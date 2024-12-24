import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCategoryBooksListComponent } from './library-category-books-list.component';

describe('LibraryCategoryBooksListComponent', () => {
  let component: LibraryCategoryBooksListComponent;
  let fixture: ComponentFixture<LibraryCategoryBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCategoryBooksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCategoryBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
