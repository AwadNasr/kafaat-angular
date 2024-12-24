import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantVolunteerComponent } from './add-participant-volunteer.component';

describe('AddParticipantVolunteerComponent', () => {
  let component: AddParticipantVolunteerComponent;
  let fixture: ComponentFixture<AddParticipantVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParticipantVolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParticipantVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
