import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsKafaatComponent } from './goals-kafaat.component';

describe('GoalsKafaatComponent', () => {
  let component: GoalsKafaatComponent;
  let fixture: ComponentFixture<GoalsKafaatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsKafaatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsKafaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
