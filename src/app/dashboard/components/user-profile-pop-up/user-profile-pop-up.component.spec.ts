import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePopUpComponent } from './user-profile-pop-up.component';

describe('UserProfilePopUpComponent', () => {
  let component: UserProfilePopUpComponent;
  let fixture: ComponentFixture<UserProfilePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilePopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
