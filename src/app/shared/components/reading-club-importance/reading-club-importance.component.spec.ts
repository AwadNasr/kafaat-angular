import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubImportanceComponent } from './reading-club-importance.component';

describe('ReadingClubImportanceComponent', () => {
  let component: ReadingClubImportanceComponent;
  let fixture: ComponentFixture<ReadingClubImportanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubImportanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubImportanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
