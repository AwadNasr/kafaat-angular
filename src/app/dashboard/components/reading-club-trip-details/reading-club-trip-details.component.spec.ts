import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubTripDetailsComponent } from './reading-club-trip-details.component';

describe('ReadingClubTripDetailsComponent', () => {
  let component: ReadingClubTripDetailsComponent;
  let fixture: ComponentFixture<ReadingClubTripDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubTripDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubTripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
