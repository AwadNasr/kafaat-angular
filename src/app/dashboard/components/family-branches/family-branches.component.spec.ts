import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyBranchesComponent } from './family-branches.component';

describe('FamilyBranchesComponent', () => {
  let component: FamilyBranchesComponent;
  let fixture: ComponentFixture<FamilyBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyBranchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
