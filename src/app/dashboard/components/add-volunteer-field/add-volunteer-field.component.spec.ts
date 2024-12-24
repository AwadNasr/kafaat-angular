import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVolunteerFieldComponent } from './add-volunteer-field.component';

describe('AddVolunteerFieldComponent', () => {
  let component: AddVolunteerFieldComponent;
  let fixture: ComponentFixture<AddVolunteerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVolunteerFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVolunteerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
