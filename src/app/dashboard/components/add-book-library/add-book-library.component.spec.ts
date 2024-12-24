import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookLibraryComponent } from './add-book-library.component';

describe('AddBookLibraryComponent', () => {
  let component: AddBookLibraryComponent;
  let fixture: ComponentFixture<AddBookLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
