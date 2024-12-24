import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFamilyBranchComponent } from './edit-family-branch.component';

describe('EditFamilyBranchComponent', () => {
  let component: EditFamilyBranchComponent;
  let fixture: ComponentFixture<EditFamilyBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFamilyBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFamilyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
