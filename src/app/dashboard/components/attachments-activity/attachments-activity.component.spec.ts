import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsActivityComponent } from './attachments-activity.component';

describe('AttachmentsActivityComponent', () => {
  let component: AttachmentsActivityComponent;
  let fixture: ComponentFixture<AttachmentsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
