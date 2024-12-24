import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubDetailsBooksComponent } from './reading-club-details-books.component';

describe('ReadingClubDetailsBooksComponent', () => {
  let component: ReadingClubDetailsBooksComponent;
  let fixture: ComponentFixture<ReadingClubDetailsBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubDetailsBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubDetailsBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
