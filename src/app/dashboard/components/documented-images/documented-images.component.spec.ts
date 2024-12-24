import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentedImagesComponent } from './documented-images.component';

describe('DocumentedImagesComponent', () => {
  let component: DocumentedImagesComponent;
  let fixture: ComponentFixture<DocumentedImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentedImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
