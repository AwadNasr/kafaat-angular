import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToPrizeComponent } from './add-user-to-prize.component';

describe('AddUserToPrizeComponent', () => {
  let component: AddUserToPrizeComponent;
  let fixture: ComponentFixture<AddUserToPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToPrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
