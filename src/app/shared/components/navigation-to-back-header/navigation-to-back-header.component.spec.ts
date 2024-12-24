import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationToBackHeaderComponent } from './navigation-to-back-header.component';

describe('NavigationToBackHeaderComponent', () => {
  let component: NavigationToBackHeaderComponent;
  let fixture: ComponentFixture<NavigationToBackHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationToBackHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationToBackHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
