import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookTabNavComponent } from './textbook-tab-nav.component';

describe('TextbookTabNavComponent', () => {
  let component: TextbookTabNavComponent;
  let fixture: ComponentFixture<TextbookTabNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookTabNavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookTabNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
