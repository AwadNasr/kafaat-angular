import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistinguishedTypesComponent } from './distinguished-types.component';

describe('DistinguishedTypesComponent', () => {
  let component: DistinguishedTypesComponent;
  let fixture: ComponentFixture<DistinguishedTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistinguishedTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistinguishedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
