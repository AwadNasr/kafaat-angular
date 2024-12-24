import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoAlbumComponent } from './add-video-album.component';

describe('AddVideoAlbumComponent', () => {
  let component: AddVideoAlbumComponent;
  let fixture: ComponentFixture<AddVideoAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
