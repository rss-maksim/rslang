import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookMenuComponent } from './textbook-menu.component';

describe('TextbookMenuComponent', () => {
  let component: TextbookMenuComponent;
  let fixture: ComponentFixture<TextbookMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
