import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMagazinePageComponent } from './edit-magazine-page.component';

describe('EditMagazinePageComponent', () => {
  let component: EditMagazinePageComponent;
  let fixture: ComponentFixture<EditMagazinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMagazinePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMagazinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
