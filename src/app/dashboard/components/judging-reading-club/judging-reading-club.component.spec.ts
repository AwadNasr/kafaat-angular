import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingReadingClubComponent } from './judging-reading-club.component';

describe('JudgingReadingClubComponent', () => {
  let component: JudgingReadingClubComponent;
  let fixture: ComponentFixture<JudgingReadingClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgingReadingClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgingReadingClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
