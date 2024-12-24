import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcellenceSectionComponent } from './add-excellence-section.component';

describe('AddExcellenceSectionComponent', () => {
  let component: AddExcellenceSectionComponent;
  let fixture: ComponentFixture<AddExcellenceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExcellenceSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExcellenceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
