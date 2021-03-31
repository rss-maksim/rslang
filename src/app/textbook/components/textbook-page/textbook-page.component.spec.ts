import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookPageComponent } from './textbook-page.component';

describe('TextbookPageComponent', () => {
  let component: TextbookPageComponent;
  let fixture: ComponentFixture<TextbookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
