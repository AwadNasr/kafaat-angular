import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceAwardConditionComponent } from './excellence-award-condition.component';

describe('ExcellenceAwardConditionComponent', () => {
  let component: ExcellenceAwardConditionComponent;
  let fixture: ComponentFixture<ExcellenceAwardConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceAwardConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceAwardConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
