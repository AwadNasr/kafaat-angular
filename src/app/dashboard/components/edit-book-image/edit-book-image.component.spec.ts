import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookImageComponent } from './edit-book-image.component';

describe('EditBookImageComponent', () => {
  let component: EditBookImageComponent;
  let fixture: ComponentFixture<EditBookImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
