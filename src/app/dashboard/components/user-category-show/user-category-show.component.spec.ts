import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoryShowComponent } from './user-category-show.component';

describe('UserCategoryShowComponent', () => {
  let component: UserCategoryShowComponent;
  let fixture: ComponentFixture<UserCategoryShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCategoryShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCategoryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
