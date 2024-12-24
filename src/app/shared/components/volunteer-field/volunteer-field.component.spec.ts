import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldComponent } from './volunteer-field.component';

describe('VolunteerFieldComponent', () => {
  let component: VolunteerFieldComponent;
  let fixture: ComponentFixture<VolunteerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
