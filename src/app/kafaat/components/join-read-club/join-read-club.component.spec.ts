import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinReadClubComponent } from './join-read-club.component';

describe('JoinReadClubComponent', () => {
  let component: JoinReadClubComponent;
  let fixture: ComponentFixture<JoinReadClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinReadClubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinReadClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
