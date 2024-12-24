import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCategoryListComponent } from './library-category-list.component';

describe('LibraryCategoryListComponent', () => {
  let component: LibraryCategoryListComponent;
  let fixture: ComponentFixture<LibraryCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
