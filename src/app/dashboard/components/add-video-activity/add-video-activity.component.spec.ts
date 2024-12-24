import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoActivityComponent } from './add-video-activity.component';

describe('AddVideoActivityComponent', () => {
  let component: AddVideoActivityComponent;
  let fixture: ComponentFixture<AddVideoActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
