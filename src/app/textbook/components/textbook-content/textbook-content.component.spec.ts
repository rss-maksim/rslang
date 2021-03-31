import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookContentComponent } from './textbook-content.component';

describe('TextbookContentComponent', () => {
  let component: TextbookContentComponent;
  let fixture: ComponentFixture<TextbookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
