import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookPaginationComponent } from './textbook-pagination.component';

describe('TextbookPaginationComponent', () => {
  let component: TextbookPaginationComponent;
  let fixture: ComponentFixture<TextbookPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookPaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
