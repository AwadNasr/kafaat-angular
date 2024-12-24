import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldParticipantsComponent } from './volunteer-field-participants.component';

describe('VolunteerFieldParticipantsComponent', () => {
  let component: VolunteerFieldParticipantsComponent;
  let fixture: ComponentFixture<VolunteerFieldParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
