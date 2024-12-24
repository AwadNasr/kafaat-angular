import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubTripsListComponent } from './reading-club-trips-list.component';

describe('ReadingClubTripsListComponent', () => {
  let component: ReadingClubTripsListComponent;
  let fixture: ComponentFixture<ReadingClubTripsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubTripsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubTripsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
