import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubReportListComponent } from './reading-club-report-list.component';

describe('ReadingClubReportListComponent', () => {
  let component: ReadingClubReportListComponent;
  let fixture: ComponentFixture<ReadingClubReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
