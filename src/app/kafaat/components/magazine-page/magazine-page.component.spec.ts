import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinePageComponent } from './magazine-page.component';

describe('MagazinePageComponent', () => {
  let component: MagazinePageComponent;
  let fixture: ComponentFixture<MagazinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazinePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
