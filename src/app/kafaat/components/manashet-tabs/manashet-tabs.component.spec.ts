import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManashetTabsComponent } from './manashet-tabs.component';

describe('ManashetTabsComponent', () => {
  let component: ManashetTabsComponent;
  let fixture: ComponentFixture<ManashetTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManashetTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManashetTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
