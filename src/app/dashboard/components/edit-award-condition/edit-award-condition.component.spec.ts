import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAwardConditionComponent } from './edit-award-condition.component';

describe('EditAwardConditionComponent', () => {
  let component: EditAwardConditionComponent;
  let fixture: ComponentFixture<EditAwardConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAwardConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAwardConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
