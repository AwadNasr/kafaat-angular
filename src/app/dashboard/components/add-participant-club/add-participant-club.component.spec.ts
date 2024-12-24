import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantClubComponent } from './add-participant-club.component';

describe('AddParticipantClubComponent', () => {
  let component: AddParticipantClubComponent;
  let fixture: ComponentFixture<AddParticipantClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParticipantClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParticipantClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
