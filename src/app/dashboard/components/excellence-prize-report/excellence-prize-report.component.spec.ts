import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellencePrizeReportComponent } from './excellence-prize-report.component';

describe('ExcellencePrizeReportComponent', () => {
  let component: ExcellencePrizeReportComponent;
  let fixture: ComponentFixture<ExcellencePrizeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellencePrizeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellencePrizeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
