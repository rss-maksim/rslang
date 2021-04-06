import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AudiochallengeGameComponent } from './audiochallenge-game.component';

describe('AudiochallengeGameComponent', () => {
  let component: AudiochallengeGameComponent;
  let fixture: ComponentFixture<AudiochallengeGameComponent>;
  let store: MockStore;
  let initialState = { audiochallenge: { curretWord: 'word' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiochallengeGameComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiochallengeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
