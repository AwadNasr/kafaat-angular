import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAwardConditionComponent } from './add-award-condition.component';

describe('AddAwardConditionComponent', () => {
  let component: AddAwardConditionComponent;
  let fixture: ComponentFixture<AddAwardConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAwardConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAwardConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
