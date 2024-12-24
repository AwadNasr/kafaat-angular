import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldsComponent } from './volunteer-fields.component';

describe('VolunteerFieldsComponent', () => {
  let component: VolunteerFieldsComponent;
  let fixture: ComponentFixture<VolunteerFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
