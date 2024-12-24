import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumPhotoComponent } from './add-album-photo.component';

describe('AddAlbumPhotoComponent', () => {
  let component: AddAlbumPhotoComponent;
  let fixture: ComponentFixture<AddAlbumPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlbumPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlbumPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
