import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubChoosingComponent } from './reading-club-choosing.component';

describe('ReadingClubChoosingComponent', () => {
  let component: ReadingClubChoosingComponent;
  let fixture: ComponentFixture<ReadingClubChoosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubChoosingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubChoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
