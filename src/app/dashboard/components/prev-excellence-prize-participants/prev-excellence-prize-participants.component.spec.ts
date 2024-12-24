import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevExcellencePrizeParticipantsComponent } from './prev-excellence-prize-participants.component';

describe('PrevExcellencePrizeParticipantsComponent', () => {
  let component: PrevExcellencePrizeParticipantsComponent;
  let fixture: ComponentFixture<PrevExcellencePrizeParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevExcellencePrizeParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevExcellencePrizeParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
