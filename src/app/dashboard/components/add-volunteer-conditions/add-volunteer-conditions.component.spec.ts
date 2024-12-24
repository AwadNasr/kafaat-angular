import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVolunteerConditionsComponent } from './add-volunteer-conditions.component';

describe('AddVolunteerConditionsComponent', () => {
  let component: AddVolunteerConditionsComponent;
  let fixture: ComponentFixture<AddVolunteerConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVolunteerConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVolunteerConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
