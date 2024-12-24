import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafaatLayoutComponent } from './kafaat-layout.component';

describe('KafaatLayoutComponent', () => {
  let component: KafaatLayoutComponent;
  let fixture: ComponentFixture<KafaatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafaatLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KafaatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
