import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintGameCardComponent } from './sprint-game-card.component';

describe('SprintGameCardComponent', () => {
  let component: SprintGameCardComponent;
  let fixture: ComponentFixture<SprintGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintGameCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
