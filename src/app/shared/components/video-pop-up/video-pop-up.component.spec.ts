import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPopUpComponent } from './video-pop-up.component';

describe('VideoPopUpComponent', () => {
  let component: VideoPopUpComponent;
  let fixture: ComponentFixture<VideoPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
