import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellencePrizeWinnersComponent } from './excellence-prize-winners.component';

describe('ExcellencePrizeWinnersComponent', () => {
  let component: ExcellencePrizeWinnersComponent;
  let fixture: ComponentFixture<ExcellencePrizeWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellencePrizeWinnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellencePrizeWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
