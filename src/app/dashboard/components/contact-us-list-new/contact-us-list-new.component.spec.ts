import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsListNewComponent } from './contact-us-list-new.component';

describe('ContactUsListNewComponent', () => {
  let component: ContactUsListNewComponent;
  let fixture: ComponentFixture<ContactUsListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsListNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
