import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsListNotSentComponent } from './contact-us-list-not-sent.component';

describe('ContactUsListNotSentComponent', () => {
  let component: ContactUsListNotSentComponent;
  let fixture: ComponentFixture<ContactUsListNotSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsListNotSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsListNotSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
