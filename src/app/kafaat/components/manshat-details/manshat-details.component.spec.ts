import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManshatDetailsComponent } from './manshat-details.component';

describe('ManshatDetailsComponent', () => {
  let component: ManshatDetailsComponent;
  let fixture: ComponentFixture<ManshatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManshatDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManshatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
