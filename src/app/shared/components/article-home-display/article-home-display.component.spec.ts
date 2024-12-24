import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHomeDisplayComponent } from './article-home-display.component';

describe('ArticleHomeDisplayComponent', () => {
  let component: ArticleHomeDisplayComponent;
  let fixture: ComponentFixture<ArticleHomeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleHomeDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleHomeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
