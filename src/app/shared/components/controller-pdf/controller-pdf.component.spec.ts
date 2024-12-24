import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerPdfComponent } from './controller-pdf.component';

describe('ControllerPdfComponent', () => {
  let component: ControllerPdfComponent;
  let fixture: ComponentFixture<ControllerPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
