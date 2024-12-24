import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetDetailsReportPageComponent } from './manashet-details-report-page.component';

describe('ManashetDetailsReportPageComponent', () => {
  let component: ManashetDetailsReportPageComponent;
  let fixture: ComponentFixture<ManashetDetailsReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetDetailsReportPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetDetailsReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
