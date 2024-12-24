import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarousalAngleComponent } from './item-carousal-angle.component';

describe('ItemCarousalAngleComponent', () => {
  let component: ItemCarousalAngleComponent;
  let fixture: ComponentFixture<ItemCarousalAngleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCarousalAngleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCarousalAngleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
