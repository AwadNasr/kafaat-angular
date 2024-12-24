import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetParticipantComponent } from './get-participant.component';

describe('GetParticipantComponent', () => {
  let component: GetParticipantComponent;
  let fixture: ComponentFixture<GetParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
