import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManashetComponent } from './profile-manashet.component';

describe('ProfileManashetComponent', () => {
  let component: ProfileManashetComponent;
  let fixture: ComponentFixture<ProfileManashetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileManashetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileManashetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
