import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceProgramComponent } from './excellence-program.component';

describe('ExcellenceProgramComponent', () => {
  let component: ExcellenceProgramComponent;
  let fixture: ComponentFixture<ExcellenceProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
