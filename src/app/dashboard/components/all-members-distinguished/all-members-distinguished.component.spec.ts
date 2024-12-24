import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMembersDistinguishedComponent } from './all-members-distinguished.component';

describe('AllMembersDistinguishedComponent', () => {
  let component: AllMembersDistinguishedComponent;
  let fixture: ComponentFixture<AllMembersDistinguishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMembersDistinguishedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMembersDistinguishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
