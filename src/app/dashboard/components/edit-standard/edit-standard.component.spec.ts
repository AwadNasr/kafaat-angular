import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStandardComponent } from './edit-standard.component';

describe('EditStandardComponent', () => {
  let component: EditStandardComponent;
  let fixture: ComponentFixture<EditStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStandardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
