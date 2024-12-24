import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetDetailsSharedPageComponent } from './manashet-details-shared-page.component';

describe('ManashetDetailsSharedPageComponent', () => {
  let component: ManashetDetailsSharedPageComponent;
  let fixture: ComponentFixture<ManashetDetailsSharedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetDetailsSharedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetDetailsSharedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
