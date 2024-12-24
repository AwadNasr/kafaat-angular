import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcellenceClubComponent } from './add-excellence-club.component';

describe('AddExcellenceClubComponent', () => {
  let component: AddExcellenceClubComponent;
  let fixture: ComponentFixture<AddExcellenceClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExcellenceClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExcellenceClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
