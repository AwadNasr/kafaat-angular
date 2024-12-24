import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinVolunteerComponent } from './join-volunteer.component';

describe('JoinVolunteerComponent', () => {
  let component: JoinVolunteerComponent;
  let fixture: ComponentFixture<JoinVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinVolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
