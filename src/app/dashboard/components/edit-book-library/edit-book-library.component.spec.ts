import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookLibraryComponent } from './edit-book-library.component';

describe('EditBookLibraryComponent', () => {
  let component: EditBookLibraryComponent;
  let fixture: ComponentFixture<EditBookLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
