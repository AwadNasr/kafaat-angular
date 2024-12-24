import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecializationsComponent } from './add-specializations.component';

describe('AddSpecializationsComponent', () => {
  let component: AddSpecializationsComponent;
  let fixture: ComponentFixture<AddSpecializationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecializationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpecializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
