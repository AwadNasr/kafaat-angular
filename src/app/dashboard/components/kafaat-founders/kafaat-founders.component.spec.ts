import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafaatFoundersComponent } from './kafaat-founders.component';

describe('KafaatFoundersComponent', () => {
  let component: KafaatFoundersComponent;
  let fixture: ComponentFixture<KafaatFoundersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafaatFoundersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KafaatFoundersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
