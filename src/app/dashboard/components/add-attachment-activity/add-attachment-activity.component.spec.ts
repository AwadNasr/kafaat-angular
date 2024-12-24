import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttachmentActivityComponent } from './add-attachment-activity.component';

describe('AddAttachmentActivityComponent', () => {
  let component: AddAttachmentActivityComponent;
  let fixture: ComponentFixture<AddAttachmentActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttachmentActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttachmentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
