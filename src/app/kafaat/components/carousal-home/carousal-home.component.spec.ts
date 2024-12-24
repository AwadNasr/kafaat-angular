import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarousalHomeComponent } from './carousal-home.component';

describe('CarousalHomeComponent', () => {
  let component: CarousalHomeComponent;
  let fixture: ComponentFixture<CarousalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarousalHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarousalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
