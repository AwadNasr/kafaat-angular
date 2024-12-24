import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerReportComponent } from './volunteer-report.component';

describe('VolunteerReportComponent', () => {
  let component: VolunteerReportComponent;
  let fixture: ComponentFixture<VolunteerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
