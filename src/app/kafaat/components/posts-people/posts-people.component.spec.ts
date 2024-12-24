import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPeopleComponent } from './posts-people.component';

describe('PostsPeopleComponent', () => {
  let component: PostsPeopleComponent;
  let fixture: ComponentFixture<PostsPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
