import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookToClubTripComponent } from './add-book-to-club-trip.component';

describe('AddBookToClubTripComponent', () => {
  let component: AddBookToClubTripComponent;
  let fixture: ComponentFixture<AddBookToClubTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookToClubTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookToClubTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
