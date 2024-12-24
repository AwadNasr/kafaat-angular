import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePhotosListComponent } from './site-photos-list.component';

describe('SitePhotosListComponent', () => {
  let component: SitePhotosListComponent;
  let fixture: ComponentFixture<SitePhotosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitePhotosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitePhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
