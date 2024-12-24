import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClubComponent } from './read-club.component';

describe('ReadClubComponent', () => {
  let component: ReadClubComponent;
  let fixture: ComponentFixture<ReadClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
