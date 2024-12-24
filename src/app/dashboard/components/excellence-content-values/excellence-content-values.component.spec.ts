import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceContentValuesComponent } from './excellence-content-values.component';

describe('ExcellenceContentValuesComponent', () => {
  let component: ExcellenceContentValuesComponent;
  let fixture: ComponentFixture<ExcellenceContentValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceContentValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceContentValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
