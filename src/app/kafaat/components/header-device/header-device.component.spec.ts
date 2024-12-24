import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDeviceComponent } from './header-device.component';

describe('HeaderDeviceComponent', () => {
  let component: HeaderDeviceComponent;
  let fixture: ComponentFixture<HeaderDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
