import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticReadingClubComponent } from './static-reading-club.component';

describe('StaticReadingClubComponent', () => {
  let component: StaticReadingClubComponent;
  let fixture: ComponentFixture<StaticReadingClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticReadingClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticReadingClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
