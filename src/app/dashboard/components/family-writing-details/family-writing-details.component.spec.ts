import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyWritingDetailsComponent } from './family-writing-details.component';

describe('FamilyWritingDetailsComponent', () => {
  let component: FamilyWritingDetailsComponent;
  let fixture: ComponentFixture<FamilyWritingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyWritingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyWritingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
