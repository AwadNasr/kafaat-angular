import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailsContentComponent } from './club-details-content.component';

describe('ClubDetailsContentComponent', () => {
  let component: ClubDetailsContentComponent;
  let fixture: ComponentFixture<ClubDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubDetailsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
