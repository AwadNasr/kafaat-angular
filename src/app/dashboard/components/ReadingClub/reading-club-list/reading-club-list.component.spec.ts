import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubListComponent } from './reading-club-list.component';

describe('ReadingClubListComponent', () => {
  let component: ReadingClubListComponent;
  let fixture: ComponentFixture<ReadingClubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
