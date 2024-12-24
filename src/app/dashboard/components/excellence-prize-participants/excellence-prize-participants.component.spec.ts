import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellencePrizeParticipantsComponent } from './excellence-prize-participants.component';

describe('ExcellencePrizeParticipantsComponent', () => {
  let component: ExcellencePrizeParticipantsComponent;
  let fixture: ComponentFixture<ExcellencePrizeParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellencePrizeParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellencePrizeParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
