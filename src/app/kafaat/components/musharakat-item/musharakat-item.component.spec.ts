import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusharakatItemComponent } from './musharakat-item.component';

describe('MusharakatItemComponent', () => {
  let component: MusharakatItemComponent;
  let fixture: ComponentFixture<MusharakatItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusharakatItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusharakatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
