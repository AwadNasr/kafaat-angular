import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderLabeledComponent } from './page-header-labeled.component';

describe('PageHeaderLabeledComponent', () => {
  let component: PageHeaderLabeledComponent;
  let fixture: ComponentFixture<PageHeaderLabeledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHeaderLabeledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHeaderLabeledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
