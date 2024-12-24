import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccountInformationComponent } from './profile-account-information.component';

describe('ProfileAccountInformationComponent', () => {
  let component: ProfileAccountInformationComponent;
  let fixture: ComponentFixture<ProfileAccountInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAccountInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
