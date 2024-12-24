import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExcellenceAwardComponent } from './edit-excellence-award.component';

describe('EditExcellenceAwardComponent', () => {
  let component: EditExcellenceAwardComponent;
  let fixture: ComponentFixture<EditExcellenceAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExcellenceAwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExcellenceAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
