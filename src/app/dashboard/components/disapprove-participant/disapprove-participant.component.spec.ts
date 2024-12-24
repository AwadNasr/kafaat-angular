import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisapproveParticipantComponent } from './disapprove-participant.component';

describe('DisapproveParticipantComponent', () => {
  let component: DisapproveParticipantComponent;
  let fixture: ComponentFixture<DisapproveParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisapproveParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisapproveParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
