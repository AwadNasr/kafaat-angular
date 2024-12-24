import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageThirdComponent } from './image-third.component';

describe('ImageThirdComponent', () => {
  let component: ImageThirdComponent;
  let fixture: ComponentFixture<ImageThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageThirdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
