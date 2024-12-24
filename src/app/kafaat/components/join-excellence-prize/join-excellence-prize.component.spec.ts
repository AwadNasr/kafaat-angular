import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinExcellencePrizeComponent } from './join-excellence-prize.component';

describe('JoinExcellencePrizeComponent', () => {
  let component: JoinExcellencePrizeComponent;
  let fixture: ComponentFixture<JoinExcellencePrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinExcellencePrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinExcellencePrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
