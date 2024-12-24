import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingVolunteerComponent } from './judging-volunteer.component';

describe('JudgingVolunteerComponent', () => {
  let component: JudgingVolunteerComponent;
  let fixture: ComponentFixture<JudgingVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgingVolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgingVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
