import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittingDetailsComponent } from './writting-details.component';

describe('WrittingDetailsComponent', () => {
  let component: WrittingDetailsComponent;
  let fixture: ComponentFixture<WrittingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrittingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
