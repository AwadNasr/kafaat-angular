import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClubDetailsComponent } from './read-club-details.component';

describe('ReadClubDetailsComponent', () => {
  let component: ReadClubDetailsComponent;
  let fixture: ComponentFixture<ReadClubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadClubDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadClubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
