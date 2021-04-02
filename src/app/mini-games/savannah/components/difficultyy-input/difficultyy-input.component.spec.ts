import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyyInputComponent } from './difficultyy-input.component';

describe('DifficultyyInputComponent', () => {
  let component: DifficultyyInputComponent;
  let fixture: ComponentFixture<DifficultyyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DifficultyyInputComponent],
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
