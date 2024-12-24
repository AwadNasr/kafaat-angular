import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMinComponent } from './program-min.component';

describe('ProgramMinComponent', () => {
  let component: ProgramMinComponent;
  let fixture: ComponentFixture<ProgramMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
