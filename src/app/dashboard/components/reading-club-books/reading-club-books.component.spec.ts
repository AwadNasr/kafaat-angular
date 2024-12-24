import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubBooksComponent } from './reading-club-books.component';

describe('ReadingClubBooksComponent', () => {
  let component: ReadingClubBooksComponent;
  let fixture: ComponentFixture<ReadingClubBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
