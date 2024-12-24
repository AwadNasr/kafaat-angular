import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerFieldListComponent } from './volunteer-field-list.component';

describe('VolunteerFieldListComponent', () => {
  let component: VolunteerFieldListComponent;
  let fixture: ComponentFixture<VolunteerFieldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerFieldListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
