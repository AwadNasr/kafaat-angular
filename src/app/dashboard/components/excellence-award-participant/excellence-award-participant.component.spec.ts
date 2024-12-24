import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceAwardParticipantComponent } from './excellence-award-participant.component';

describe('ExcellenceAwardParticipantComponent', () => {
  let component: ExcellenceAwardParticipantComponent;
  let fixture: ComponentFixture<ExcellenceAwardParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceAwardParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceAwardParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
