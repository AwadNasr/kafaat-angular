import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordMembersComponent } from './change-password-members.component';

describe('ChangePasswordMembersComponent', () => {
  let component: ChangePasswordMembersComponent;
  let fixture: ComponentFixture<ChangePasswordMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
