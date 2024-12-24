import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubLibraryDetailsComponent } from './reading-club-library-details.component';

describe('ReadingClubLibraryDetailsComponent', () => {
  let component: ReadingClubLibraryDetailsComponent;
  let fixture: ComponentFixture<ReadingClubLibraryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubLibraryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubLibraryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
