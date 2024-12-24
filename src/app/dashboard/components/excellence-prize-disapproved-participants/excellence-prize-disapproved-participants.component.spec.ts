import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellencePrizeDisapprovedParticipantsComponent } from './excellence-prize-disapproved-participants.component';

describe('ExcellencePrizeDisapprovedParticipantsComponent', () => {
  let component: ExcellencePrizeDisapprovedParticipantsComponent;
  let fixture: ComponentFixture<ExcellencePrizeDisapprovedParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellencePrizeDisapprovedParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellencePrizeDisapprovedParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
