import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseOfJoinComponent } from './response-of-join.component';

describe('ResponseOfJoinComponent', () => {
  let component: ResponseOfJoinComponent;
  let fixture: ComponentFixture<ResponseOfJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseOfJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseOfJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
