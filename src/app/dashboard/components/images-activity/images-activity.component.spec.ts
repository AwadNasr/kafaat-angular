import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesActivityComponent } from './images-activity.component';

describe('ImagesActivityComponent', () => {
  let component: ImagesActivityComponent;
  let fixture: ComponentFixture<ImagesActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
