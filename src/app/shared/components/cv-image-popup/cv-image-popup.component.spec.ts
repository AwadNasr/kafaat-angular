import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvImagePopupComponent } from './cv-image-popup.component';

describe('CvImagePopupComponent', () => {
  let component: CvImagePopupComponent;
  let fixture: ComponentFixture<CvImagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvImagePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
