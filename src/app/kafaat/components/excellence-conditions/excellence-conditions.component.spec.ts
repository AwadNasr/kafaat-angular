import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceConditionsComponent } from './excellence-conditions.component';

describe('ExcellenceConditionsComponent', () => {
  let component: ExcellenceConditionsComponent;
  let fixture: ComponentFixture<ExcellenceConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
