import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMagazinePagesComponent } from './add-magazine-pages.component';

describe('AddMagazinePagesComponent', () => {
  let component: AddMagazinePagesComponent;
  let fixture: ComponentFixture<AddMagazinePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMagazinePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMagazinePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
