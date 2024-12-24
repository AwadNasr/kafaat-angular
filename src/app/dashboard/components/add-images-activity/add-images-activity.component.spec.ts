import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagesActivityComponent } from './add-images-activity.component';

describe('AddImagesActivityComponent', () => {
  let component: AddImagesActivityComponent;
  let fixture: ComponentFixture<AddImagesActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImagesActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImagesActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
