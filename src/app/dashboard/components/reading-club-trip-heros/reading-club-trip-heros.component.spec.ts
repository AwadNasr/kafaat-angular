import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubTripHerosComponent } from './reading-club-trip-heros.component';

describe('ReadingClubTripHerosComponent', () => {
  let component: ReadingClubTripHerosComponent;
  let fixture: ComponentFixture<ReadingClubTripHerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubTripHerosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubTripHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
