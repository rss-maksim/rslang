import { initialState } from './../../../../redux/reducers/userReducer';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { GameSoundsButtonComponent } from './game-sounds-button.component';

describe('GameSoundsButtonComponent', () => {
  let component: GameSoundsButtonComponent;
  let fixture: ComponentFixture<GameSoundsButtonComponent>;
  let store: MockStore;
  let initialState = { audiochallenge: { isSoundOn: true } };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameSoundsButtonComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSoundsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
