import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibraryCategoryComponent } from './add-library-category.component';

describe('AddLibraryCategoryComponent', () => {
  let component: AddLibraryCategoryComponent;
  let fixture: ComponentFixture<AddLibraryCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLibraryCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLibraryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
