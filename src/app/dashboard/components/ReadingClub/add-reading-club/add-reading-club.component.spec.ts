import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadingClubComponent } from './add-reading-club.component';

describe('AddReadingClubComponent', () => {
  let component: AddReadingClubComponent;
  let fixture: ComponentFixture<AddReadingClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReadingClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReadingClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
