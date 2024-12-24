import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldHerosComponent } from './volunteer-field-heros.component';

describe('VolunteerFieldHerosComponent', () => {
  let component: VolunteerFieldHerosComponent;
  let fixture: ComponentFixture<VolunteerFieldHerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldHerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
