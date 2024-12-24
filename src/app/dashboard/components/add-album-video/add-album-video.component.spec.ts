import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumVideoComponent } from './add-album-video.component';

describe('AddAlbumVideoComponent', () => {
  let component: AddAlbumVideoComponent;
  let fixture: ComponentFixture<AddAlbumVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlbumVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlbumVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
