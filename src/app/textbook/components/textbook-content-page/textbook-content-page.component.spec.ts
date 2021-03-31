import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookContentPageComponent } from './textbook-content-page.component';

describe('TextbookContentPageComponent', () => {
  let component: TextbookContentPageComponent;
  let fixture: ComponentFixture<TextbookContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookContentPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
