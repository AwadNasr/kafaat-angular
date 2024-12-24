import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyWritingsListComponent } from './family-writings-list.component';

describe('FamilyWritingsListComponent', () => {
  let component: FamilyWritingsListComponent;
  let fixture: ComponentFixture<FamilyWritingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyWritingsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyWritingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
