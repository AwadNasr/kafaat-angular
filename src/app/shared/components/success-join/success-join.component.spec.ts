import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessJoinComponent } from './success-join.component';

describe('SuccessJoinComponent', () => {
  let component: SuccessJoinComponent;
  let fixture: ComponentFixture<SuccessJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
