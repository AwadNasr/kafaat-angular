import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyWritingsComponent } from './family-writings.component';

describe('FamilyWritingsComponent', () => {
  let component: FamilyWritingsComponent;
  let fixture: ComponentFixture<FamilyWritingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyWritingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyWritingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
