import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverProgramsComponent } from './discover-programs.component';

describe('DiscoverProgramsComponent', () => {
  let component: DiscoverProgramsComponent;
  let fixture: ComponentFixture<DiscoverProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
