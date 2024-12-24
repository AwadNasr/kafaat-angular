import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadClubComponent } from './add-read-club.component';

describe('AddReadClubComponent', () => {
  let component: AddReadClubComponent;
  let fixture: ComponentFixture<AddReadClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReadClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReadClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
