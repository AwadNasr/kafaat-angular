import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadingClubReportComponent } from './add-reading-club-report.component';

describe('AddReadingClubReportComponent', () => {
  let component: AddReadingClubReportComponent;
  let fixture: ComponentFixture<AddReadingClubReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReadingClubReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReadingClubReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
