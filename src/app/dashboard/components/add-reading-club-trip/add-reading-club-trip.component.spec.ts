import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadingClubTripComponent } from './add-reading-club-trip.component';

describe('AddReadingClubTripComponent', () => {
  let component: AddReadingClubTripComponent;
  let fixture: ComponentFixture<AddReadingClubTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReadingClubTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReadingClubTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
