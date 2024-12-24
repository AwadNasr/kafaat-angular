import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistinguishedTypesComponent } from './add-distinguished-types.component';

describe('AddDistinguishedTypesComponent', () => {
  let component: AddDistinguishedTypesComponent;
  let fixture: ComponentFixture<AddDistinguishedTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDistinguishedTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDistinguishedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
