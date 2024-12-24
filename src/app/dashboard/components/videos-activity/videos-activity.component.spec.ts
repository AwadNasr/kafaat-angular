import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosActivityComponent } from './videos-activity.component';

describe('VideosActivityComponent', () => {
  let component: VideosActivityComponent;
  let fixture: ComponentFixture<VideosActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
