import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetDetailsImageGalleryPageComponent } from './manashet-details-image-gallery-page.component';

describe('ManashetDetailsImageGalleryPageComponent', () => {
  let component: ManashetDetailsImageGalleryPageComponent;
  let fixture: ComponentFixture<ManashetDetailsImageGalleryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetDetailsImageGalleryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetDetailsImageGalleryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
