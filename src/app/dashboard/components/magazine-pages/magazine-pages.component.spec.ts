import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinePagesComponent } from './magazine-pages.component';

describe('MagazinePagesComponent', () => {
  let component: MagazinePagesComponent;
  let fixture: ComponentFixture<MagazinePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazinePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazinePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
