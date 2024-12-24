import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcellencePrizeReportComponent } from './add-excellence-prize-report.component';

describe('AddExcellencePrizeReportComponent', () => {
  let component: AddExcellencePrizeReportComponent;
  let fixture: ComponentFixture<AddExcellencePrizeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExcellencePrizeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExcellencePrizeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
