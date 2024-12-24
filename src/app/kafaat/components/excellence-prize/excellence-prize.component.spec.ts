import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellencePrizeComponent } from './excellence-prize.component';

describe('ExcellencePrizeComponent', () => {
  let component: ExcellencePrizeComponent;
  let fixture: ComponentFixture<ExcellencePrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellencePrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellencePrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
