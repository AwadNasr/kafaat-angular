import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumVideoComponent } from './album-video.component';

describe('AlbumVideoComponent', () => {
  let component: AlbumVideoComponent;
  let fixture: ComponentFixture<AlbumVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
