import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetDetailsVideoGalleryPageComponent } from './manashet-details-video-gallery-page.component';

describe('ManashetDetailsVideoGalleryPageComponent', () => {
  let component: ManashetDetailsVideoGalleryPageComponent;
  let fixture: ComponentFixture<ManashetDetailsVideoGalleryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetDetailsVideoGalleryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetDetailsVideoGalleryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
