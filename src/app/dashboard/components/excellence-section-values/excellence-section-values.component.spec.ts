import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceSectionValuesComponent } from './excellence-section-values.component';

describe('ExcellenceSectionValuesComponent', () => {
  let component: ExcellenceSectionValuesComponent;
  let fixture: ComponentFixture<ExcellenceSectionValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceSectionValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceSectionValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
