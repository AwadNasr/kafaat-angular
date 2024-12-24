import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailPopUpComponent } from './send-email-pop-up.component';

describe('SendEmailPopUpComponent', () => {
  let component: SendEmailPopUpComponent;
  let fixture: ComponentFixture<SendEmailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendEmailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
