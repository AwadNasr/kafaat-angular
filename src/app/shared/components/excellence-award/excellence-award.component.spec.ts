import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceAwardComponent } from './excellence-award.component';

describe('ExcellenceAwardComponent', () => {
  let component: ExcellenceAwardComponent;
  let fixture: ComponentFixture<ExcellenceAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
