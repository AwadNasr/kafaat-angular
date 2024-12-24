import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavActivitiesComponent } from './nav-activities.component';

describe('NavActivitiesComponent', () => {
  let component: NavActivitiesComponent;
  let fixture: ComponentFixture<NavActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
