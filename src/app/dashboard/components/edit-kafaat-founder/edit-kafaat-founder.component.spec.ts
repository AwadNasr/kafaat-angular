import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKafaatFounderComponent } from './edit-kafaat-founder.component';

describe('EditKafaatFounderComponent', () => {
  let component: EditKafaatFounderComponent;
  let fixture: ComponentFixture<EditKafaatFounderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKafaatFounderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditKafaatFounderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
