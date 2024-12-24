import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubSectionComponent } from './reading-club-section.component';

describe('ReadingClubSectionComponent', () => {
  let component: ReadingClubSectionComponent;
  let fixture: ComponentFixture<ReadingClubSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
