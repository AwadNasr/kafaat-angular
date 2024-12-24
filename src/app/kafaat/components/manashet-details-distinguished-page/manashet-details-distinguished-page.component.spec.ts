import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetDetailsDistinguishedPageComponent } from './manashet-details-distinguished-page.component';

describe('ManashetDetailsDistinguishedPageComponent', () => {
  let component: ManashetDetailsDistinguishedPageComponent;
  let fixture: ComponentFixture<ManashetDetailsDistinguishedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetDetailsDistinguishedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetDetailsDistinguishedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
