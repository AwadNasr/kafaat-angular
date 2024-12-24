import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollMagazineComponent } from './scroll-magazine.component';

describe('ScrollMagazineComponent', () => {
  let component: ScrollMagazineComponent;
  let fixture: ComponentFixture<ScrollMagazineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollMagazineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollMagazineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
