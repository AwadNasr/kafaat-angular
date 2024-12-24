import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellencePrizeListComponent } from './excellence-prize-list.component';

describe('ExcellencePrizeListComponent', () => {
  let component: ExcellencePrizeListComponent;
  let fixture: ComponentFixture<ExcellencePrizeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellencePrizeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellencePrizeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
