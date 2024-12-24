import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingPublishersComponent } from './judging-publishers.component';

describe('JudgingPublishersComponent', () => {
  let component: JudgingPublishersComponent;
  let fixture: ComponentFixture<JudgingPublishersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgingPublishersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgingPublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
