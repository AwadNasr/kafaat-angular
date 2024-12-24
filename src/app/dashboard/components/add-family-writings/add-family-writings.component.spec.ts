import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamilyWritingsComponent } from './add-family-writings.component';

describe('AddFamilyWritingsComponent', () => {
  let component: AddFamilyWritingsComponent;
  let fixture: ComponentFixture<AddFamilyWritingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamilyWritingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFamilyWritingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
