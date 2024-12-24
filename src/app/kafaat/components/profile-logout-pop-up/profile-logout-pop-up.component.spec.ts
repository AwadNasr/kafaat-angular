import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLogoutPopUpComponent } from './profile-logout-pop-up.component';

describe('ProfileLogoutPopUpComponent', () => {
  let component: ProfileLogoutPopUpComponent;
  let fixture: ComponentFixture<ProfileLogoutPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLogoutPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLogoutPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
