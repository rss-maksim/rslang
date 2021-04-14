import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SpellingGameComponent } from './spelling-game.component';

describe('SpellinigGameComponent', () => {
  let component: SpellingGameComponent;
  let fixture: ComponentFixture<SpellingGameComponent>;
  let store: MockStore;
  let initialState = { spelling: { curretWord: 'word' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpellingGameComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
