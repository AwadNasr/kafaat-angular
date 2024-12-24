import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellencePrizeDetailsComponent } from './excellence-prize-details.component';

describe('ExcellencePrizeDetailsComponent', () => {
  let component: ExcellencePrizeDetailsComponent;
  let fixture: ComponentFixture<ExcellencePrizeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellencePrizeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellencePrizeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
