import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsSlidesComponent } from './posts-slides.component';

describe('PostsSlidesComponent', () => {
  let component: PostsSlidesComponent;
  let fixture: ComponentFixture<PostsSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsSlidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
