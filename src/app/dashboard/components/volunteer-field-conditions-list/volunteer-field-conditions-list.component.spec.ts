import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldConditionsListComponent } from './volunteer-field-conditions-list.component';

describe('VolunteerFieldConditionsListComponent', () => {
  let component: VolunteerFieldConditionsListComponent;
  let fixture: ComponentFixture<VolunteerFieldConditionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldConditionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldConditionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
