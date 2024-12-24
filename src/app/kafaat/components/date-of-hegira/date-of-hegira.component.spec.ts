import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateOfHegiraComponent } from './date-of-hegira.component';

describe('DateOfHegiraComponent', () => {
  let component: DateOfHegiraComponent;
  let fixture: ComponentFixture<DateOfHegiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateOfHegiraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateOfHegiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
