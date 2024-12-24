import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldDisapprovedComponent } from './volunteer-field-disapproved.component';

describe('VolunteerFieldDisapprovedComponent', () => {
  let component: VolunteerFieldDisapprovedComponent;
  let fixture: ComponentFixture<VolunteerFieldDisapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldDisapprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldDisapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
