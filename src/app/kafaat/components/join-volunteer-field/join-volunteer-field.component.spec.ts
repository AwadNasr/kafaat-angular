import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinVolunteerFieldComponent } from './join-volunteer-field.component';

describe('JoinVolunteerFieldComponent', () => {
  let component: JoinVolunteerFieldComponent;
  let fixture: ComponentFixture<JoinVolunteerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinVolunteerFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinVolunteerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
