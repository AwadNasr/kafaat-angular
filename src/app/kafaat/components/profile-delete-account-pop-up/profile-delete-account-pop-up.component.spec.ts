import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeleteAccountPopUpComponent } from './profile-delete-account-pop-up.component';

describe('ProfileDeleteAccountPopUpComponent', () => {
  let component: ProfileDeleteAccountPopUpComponent;
  let fixture: ComponentFixture<ProfileDeleteAccountPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDeleteAccountPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDeleteAccountPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
