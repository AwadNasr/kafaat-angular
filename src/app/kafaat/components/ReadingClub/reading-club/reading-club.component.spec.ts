import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingClubComponent } from './reading-club.component';

describe('ReadingClubComponent', () => {
  let component: ReadingClubComponent;
  let fixture: ComponentFixture<ReadingClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
