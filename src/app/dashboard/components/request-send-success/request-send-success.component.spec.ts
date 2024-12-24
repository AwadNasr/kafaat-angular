import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSendSuccessComponent } from './request-send-success.component';

describe('RequestSendSuccessComponent', () => {
  let component: RequestSendSuccessComponent;
  let fixture: ComponentFixture<RequestSendSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSendSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSendSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
