import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityTypeComponent } from './add-activity-type.component';

describe('AddActivityTypeComponent', () => {
  let component: AddActivityTypeComponent;
  let fixture: ComponentFixture<AddActivityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActivityTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActivityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
