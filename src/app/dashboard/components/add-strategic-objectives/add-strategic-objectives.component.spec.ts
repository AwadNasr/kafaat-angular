import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStrategicObjectivesComponent } from './add-strategic-objectives.component';

describe('AddStrategicObjectivesComponent', () => {
  let component: AddStrategicObjectivesComponent;
  let fixture: ComponentFixture<AddStrategicObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStrategicObjectivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStrategicObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
