import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TextbookContentComponent } from './textbook-content.component';

describe('TextbookContentComponent', () => {
  let component: TextbookContentComponent;
  let fixture: ComponentFixture<TextbookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextbookContentComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
