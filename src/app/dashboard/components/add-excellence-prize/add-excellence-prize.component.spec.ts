import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcellencePrizeComponent } from './add-excellence-prize.component';

describe('AddExcellencePrizeComponent', () => {
  let component: AddExcellencePrizeComponent;
  let fixture: ComponentFixture<AddExcellencePrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExcellencePrizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExcellencePrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
