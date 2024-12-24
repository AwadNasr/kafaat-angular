import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAwardComponent } from './join-award.component';

describe('JoinAwardComponent', () => {
  let component: JoinAwardComponent;
  let fixture: ComponentFixture<JoinAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
