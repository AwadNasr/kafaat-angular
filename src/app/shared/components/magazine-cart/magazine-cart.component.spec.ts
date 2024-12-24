import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazineCartComponent } from './magazine-cart.component';

describe('MagazineCartComponent', () => {
  let component: MagazineCartComponent;
  let fixture: ComponentFixture<MagazineCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazineCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazineCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
