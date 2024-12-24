import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPublicationsComponent } from './approved-publications.component';

describe('ApprovedPublicationsComponent', () => {
  let component: ApprovedPublicationsComponent;
  let fixture: ComponentFixture<ApprovedPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPublicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
