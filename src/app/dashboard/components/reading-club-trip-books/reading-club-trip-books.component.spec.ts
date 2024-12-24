import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubTripBooksComponent } from './reading-club-trip-books.component';

describe('ReadingClubTripBooksComponent', () => {
  let component: ReadingClubTripBooksComponent;
  let fixture: ComponentFixture<ReadingClubTripBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubTripBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubTripBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
