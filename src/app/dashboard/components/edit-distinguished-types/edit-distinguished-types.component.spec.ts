import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistinguishedTypesComponent } from './edit-distinguished-types.component';

describe('EditDistinguishedTypesComponent', () => {
  let component: EditDistinguishedTypesComponent;
  let fixture: ComponentFixture<EditDistinguishedTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDistinguishedTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDistinguishedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
