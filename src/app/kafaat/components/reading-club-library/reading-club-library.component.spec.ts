import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubLibraryComponent } from './reading-club-library.component';

describe('ReadingClubLibraryComponent', () => {
  let component: ReadingClubLibraryComponent;
  let fixture: ComponentFixture<ReadingClubLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
