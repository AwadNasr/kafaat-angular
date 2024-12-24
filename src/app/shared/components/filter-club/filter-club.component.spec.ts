import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClubComponent } from './filter-club.component';

describe('FilterClubComponent', () => {
  let component: FilterClubComponent;
  let fixture: ComponentFixture<FilterClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
