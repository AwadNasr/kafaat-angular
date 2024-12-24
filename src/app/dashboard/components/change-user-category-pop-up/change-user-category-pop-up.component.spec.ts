import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserCategoryPopUpComponent } from './change-user-category-pop-up.component';

describe('ChangeUserCategoryPopUpComponent', () => {
  let component: ChangeUserCategoryPopUpComponent;
  let fixture: ComponentFixture<ChangeUserCategoryPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUserCategoryPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeUserCategoryPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
