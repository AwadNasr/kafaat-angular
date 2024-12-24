import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFamilyWritingsComponent } from './join-family-writings.component';

describe('JoinFamilyWritingsComponent', () => {
  let component: JoinFamilyWritingsComponent;
  let fixture: ComponentFixture<JoinFamilyWritingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinFamilyWritingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinFamilyWritingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
