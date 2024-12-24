import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthFaamousComponent } from './month-faamous.component';

describe('MonthFaamousComponent', () => {
  let component: MonthFaamousComponent;
  let fixture: ComponentFixture<MonthFaamousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthFaamousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthFaamousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
