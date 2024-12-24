import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyWritingsDetailsComponent } from './family-writings-details.component';

describe('FamilyWritingsDetailsComponent', () => {
  let component: FamilyWritingsDetailsComponent;
  let fixture: ComponentFixture<FamilyWritingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyWritingsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyWritingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
