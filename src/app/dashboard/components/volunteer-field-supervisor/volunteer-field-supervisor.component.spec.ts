import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldSupervisorComponent } from './volunteer-field-supervisor.component';

describe('VolunteerFieldSupervisorComponent', () => {
  let component: VolunteerFieldSupervisorComponent;
  let fixture: ComponentFixture<VolunteerFieldSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldSupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
