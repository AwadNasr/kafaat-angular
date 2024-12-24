import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetItemComponent } from './manashet-item.component';

describe('ManashetItemComponent', () => {
  let component: ManashetItemComponent;
  let fixture: ComponentFixture<ManashetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
