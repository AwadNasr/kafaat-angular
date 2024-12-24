import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCarousalHomeComponent } from './posts-carousal-home.component';

describe('PostsCarousalHomeComponent', () => {
  let component: PostsCarousalHomeComponent;
  let fixture: ComponentFixture<PostsCarousalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCarousalHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCarousalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
