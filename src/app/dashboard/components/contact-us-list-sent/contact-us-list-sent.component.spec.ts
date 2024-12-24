import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsListSentComponent } from './contact-us-list-sent.component';

describe('ContactUsListSentComponent', () => {
  let component: ContactUsListSentComponent;
  let fixture: ComponentFixture<ContactUsListSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsListSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsListSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
