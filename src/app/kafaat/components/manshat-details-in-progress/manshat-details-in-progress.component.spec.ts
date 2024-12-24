import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManshatDetailsInProgressComponent } from './manshat-details-in-progress.component';

describe('ManshatDetailsInProgressComponent', () => {
  let component: ManshatDetailsInProgressComponent;
  let fixture: ComponentFixture<ManshatDetailsInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManshatDetailsInProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManshatDetailsInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
