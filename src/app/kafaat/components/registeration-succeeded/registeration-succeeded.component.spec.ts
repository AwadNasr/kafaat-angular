import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationSucceededComponent } from './registeration-succeeded.component';

describe('RegisterationSucceededComponent', () => {
  let component: RegisterationSucceededComponent;
  let fixture: ComponentFixture<RegisterationSucceededComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterationSucceededComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterationSucceededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
