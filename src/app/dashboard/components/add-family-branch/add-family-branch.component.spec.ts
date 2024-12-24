import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamilyBranchComponent } from './add-family-branch.component';

describe('AddFamilyBranchComponent', () => {
  let component: AddFamilyBranchComponent;
  let fixture: ComponentFixture<AddFamilyBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamilyBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFamilyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
