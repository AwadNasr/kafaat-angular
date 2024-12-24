import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSitePhotoComponent } from './add-site-photo.component';

describe('AddSitePhotoComponent', () => {
  let component: AddSitePhotoComponent;
  let fixture: ComponentFixture<AddSitePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSitePhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSitePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
