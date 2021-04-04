import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyyInputComponent } from './difficultyy-input.component';

describe('DifficultyyInputComponent', () => {
  let component: DifficultyyInputComponent;
  let fixture: ComponentFixture<DifficultyyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DifficultyyInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
