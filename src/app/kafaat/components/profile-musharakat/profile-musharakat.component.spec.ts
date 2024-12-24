import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMusharakatComponent } from './profile-musharakat.component';

describe('ProfileMusharakatComponent', () => {
  let component: ProfileMusharakatComponent;
  let fixture: ComponentFixture<ProfileMusharakatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMusharakatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMusharakatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
