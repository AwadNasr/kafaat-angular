import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldParticipantComponent } from './volunteer-field-participant.component';

describe('VolunteerFieldParticipantComponent', () => {
  let component: VolunteerFieldParticipantComponent;
  let fixture: ComponentFixture<VolunteerFieldParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
