import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetDetailsAttachmentPageComponent } from './manashet-details-attachment-page.component';

describe('ManashetDetailsAttachmentPageComponent', () => {
  let component: ManashetDetailsAttachmentPageComponent;
  let fixture: ComponentFixture<ManashetDetailsAttachmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetDetailsAttachmentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetDetailsAttachmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
