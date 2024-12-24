import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittingListComponent } from './writting-list.component';

describe('WrittingListComponent', () => {
  let component: WrittingListComponent;
  let fixture: ComponentFixture<WrittingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrittingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
