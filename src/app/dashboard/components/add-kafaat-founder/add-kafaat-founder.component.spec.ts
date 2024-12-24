import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKafaatFounderComponent } from './add-kafaat-founder.component';

describe('AddKafaatFounderComponent', () => {
  let component: AddKafaatFounderComponent;
  let fixture: ComponentFixture<AddKafaatFounderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKafaatFounderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKafaatFounderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
