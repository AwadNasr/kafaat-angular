import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubDetailsComponent } from './reading-club-details.component';

describe('ReadingClubDetailsComponent', () => {
  let component: ReadingClubDetailsComponent;
  let fixture: ComponentFixture<ReadingClubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
