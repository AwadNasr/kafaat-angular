import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceAwardDetailsComponent } from './excellence-award-details.component';

describe('ExcellenceAwardDetailsComponent', () => {
  let component: ExcellenceAwardDetailsComponent;
  let fixture: ComponentFixture<ExcellenceAwardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceAwardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceAwardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
