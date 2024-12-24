import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClubTripDetailsComponent } from './read-club-trip-details.component';

describe('ReadClubTripDetailsComponent', () => {
  let component: ReadClubTripDetailsComponent;
  let fixture: ComponentFixture<ReadClubTripDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadClubTripDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadClubTripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
