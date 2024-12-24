import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClubListComponent } from './read-club-list.component';

describe('ReadClubListComponent', () => {
  let component: ReadClubListComponent;
  let fixture: ComponentFixture<ReadClubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadClubListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
