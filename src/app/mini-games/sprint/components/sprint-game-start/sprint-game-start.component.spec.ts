import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintGameStartComponent } from './sprint-game-start.component';

describe('SprintGameStartComponent', () => {
  let component: SprintGameStartComponent;
  let fixture: ComponentFixture<SprintGameStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintGameStartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintGameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
