import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoryAddComponent } from './user-category-add.component';

describe('UserCategoryAddComponent', () => {
  let component: UserCategoryAddComponent;
  let fixture: ComponentFixture<UserCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCategoryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
