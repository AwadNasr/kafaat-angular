import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsAddOrUpdateResponsePopUpComponent } from './contact-us-add-or-update-response-pop-up.component';

describe('ContactUsAddOrUpdateResponsePopUpComponent', () => {
  let component: ContactUsAddOrUpdateResponsePopUpComponent;
  let fixture: ComponentFixture<ContactUsAddOrUpdateResponsePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsAddOrUpdateResponsePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsAddOrUpdateResponsePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
