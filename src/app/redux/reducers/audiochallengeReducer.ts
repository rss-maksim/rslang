import { createReducer, on, createSelector, Action, State } from '@ngrx/store';
import {
  loadWords,
  wordsLoadedSuccess,
  IWord,
  audiochallengeStarted,
  audiochallengeEnded,
  wordByIdLoadedSuccess,
  initialWord,
  translationChoosed,
  nextWord,
} from '../actions/audiochallenge.actions';
import { AudiochallengeState } from '../models/audiochallenge.state.model';

export const initialState: AudiochallengeState = {
  list: [],
  isGameStarted: false,
  currentWord: initialWord,
  audio: new Audio(),
  image: new Image(),
  isTranslationChoosed: false,
};

const audiochallengeReducer = createReducer(
  initialState,
  on(wordsLoadedSuccess, (state, { payload }) => {
    return { ...state, list: payload };
  }),
  on(audiochallengeStarted, (state) => {
    return { ...state, isGameStarted: true };
  }),
  on(audiochallengeEnded, (state) => {
    return { ...state, isGameStarted: false };
  }),
  on(wordByIdLoadedSuccess, (state, { payload }) => {
    const newList: IWord[] = state.list.filter((elem: IWord) => elem.id !== payload.id);
    return {
      ...state,
      list: [...newList],
      currentWord: payload,
      audio: new Audio(`data:audio/mp3;base64,${payload.audio}`),
      image: { ...state.image, src: `data:image/jpeg;base64,${payload.image}` },
    };
  }),
  on(translationChoosed, (state) => {
    return { ...state, isTranslationChoosed: true };
  }),
  on(nextWord, (state) => {
    return { ...state, isTranslationChoosed: false };
  }),
);

export default function reducer(state: AudiochallengeState | undefined, action: Action) {
  return audiochallengeReducer(state, action);
}
