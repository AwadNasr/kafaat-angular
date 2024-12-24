import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingPrizeComponent } from './judging-prize.component';

describe('JudgingPrizeComponent', () => {
  let component: JudgingPrizeComponent;
  let fixture: ComponentFixture<JudgingPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgingPrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgingPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
