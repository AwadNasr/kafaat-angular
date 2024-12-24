import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldDetailsComponent } from './volunteer-field-details.component';

describe('VolunteerFieldDetailsComponent', () => {
  let component: VolunteerFieldDetailsComponent;
  let fixture: ComponentFixture<VolunteerFieldDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
