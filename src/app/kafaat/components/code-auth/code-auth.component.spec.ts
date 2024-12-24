import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAuthComponent } from './code-auth.component';

describe('CodeAuthComponent', () => {
  let component: CodeAuthComponent;
  let fixture: ComponentFixture<CodeAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
