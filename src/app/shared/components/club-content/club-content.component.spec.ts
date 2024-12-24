import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubContentComponent } from './club-content.component';

describe('ClubContentComponent', () => {
  let component: ClubContentComponent;
  let fixture: ComponentFixture<ClubContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
