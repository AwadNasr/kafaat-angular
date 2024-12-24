import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVideoImageComponent } from './dialog-video-image.component';

describe('DialogVideoImageComponent', () => {
  let component: DialogVideoImageComponent;
  let fixture: ComponentFixture<DialogVideoImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVideoImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVideoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
