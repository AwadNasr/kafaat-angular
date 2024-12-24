import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumVideosComponent } from './album-videos.component';

describe('AlbumVideosComponent', () => {
  let component: AlbumVideosComponent;
  let fixture: ComponentFixture<AlbumVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
