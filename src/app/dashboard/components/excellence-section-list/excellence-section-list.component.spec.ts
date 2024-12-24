import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellenceSectionListComponent } from './excellence-section-list.component';

describe('ExcellenceSectionListComponent', () => {
  let component: ExcellenceSectionListComponent;
  let fixture: ComponentFixture<ExcellenceSectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellenceSectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcellenceSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
