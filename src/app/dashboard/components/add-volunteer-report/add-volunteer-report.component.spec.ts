import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVolunteerReportComponent } from './add-volunteer-report.component';

describe('AddVolunteerReportComponent', () => {
  let component: AddVolunteerReportComponent;
  let fixture: ComponentFixture<AddVolunteerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVolunteerReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVolunteerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
