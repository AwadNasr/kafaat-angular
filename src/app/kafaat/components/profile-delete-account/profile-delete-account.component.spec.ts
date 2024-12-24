import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeleteAccountComponent } from './profile-delete-account.component';

describe('ProfileDeleteAccountComponent', () => {
  let component: ProfileDeleteAccountComponent;
  let fixture: ComponentFixture<ProfileDeleteAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDeleteAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
