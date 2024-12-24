import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinshatCarousalComponent } from './minshat-carousal.component';

describe('MinshatCarousalComponent', () => {
  let component: MinshatCarousalComponent;
  let fixture: ComponentFixture<MinshatCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinshatCarousalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinshatCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
