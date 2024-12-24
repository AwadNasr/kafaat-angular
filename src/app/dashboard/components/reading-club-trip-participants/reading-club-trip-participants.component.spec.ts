import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubTripParticipantsComponent } from './reading-club-trip-participants.component';

describe('ReadingClubTripParticipantsComponent', () => {
  let component: ReadingClubTripParticipantsComponent;
  let fixture: ComponentFixture<ReadingClubTripParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubTripParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubTripParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
