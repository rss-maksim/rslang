import { createReducer, on, Action } from '@ngrx/store';
import {
  wordsLoadedSuccess,
  IWord,
  audiochallengeStarted,
  audiochallengeEnded,
  initialWord,
  translationChoosed,
  showNextWord,
  translationsLoadedSuccess,
  rightAnswer,
  wrongAnswer,
} from '../actions/audiochallenge.actions';
import { AudiochallengeState } from '../models/audiochallenge.state.model';

export const initialState: AudiochallengeState = {
  list: [],
  statsList: [],
  isGameStarted: false,
  currentWord: initialWord,
  audio: new Audio(),
  isTranslationChoosed: false,
  translations: [],
};

export const assetsApiUrl = 'https://github.com/rss-maksim/LearnWords/blob/master';

const audiochallengeReducer = createReducer(
  initialState,
  on(wordsLoadedSuccess, (state, { payload }) => {
    const tempWord = payload[0];
    const tempList: IWord[] = payload.filter((elem: IWord, index: number) => index !== 0);
    return {
      ...state,
      list: tempList,
      currentWord: tempWord,
      audio: new Audio(`${assetsApiUrl}/${tempWord.audio}?raw=true`),
    };
  }),
  on(translationsLoadedSuccess, (state, { payload }) => {
    const translationsSlice = payload.slice(0, 4);
    const tempArray = payload.filter((elem: string, index: number) => index > 3);
    return {
      ...state,
      translations: tempArray,
      currentWord: {
        ...state.currentWord,
        translationsArray: [...translationsSlice, state.currentWord.wordTranslate],
      },
    };
  }),
  on(audiochallengeStarted, (state) => {
    return { ...state, isGameStarted: true };
  }),
  on(audiochallengeEnded, (state) => {
    return { ...state, isGameStarted: false };
  }),
  on(translationChoosed, (state) => {
    return { ...state, isTranslationChoosed: true };
  }),
  on(rightAnswer, (state) => {
    return {
      ...state,
      statsList: [...state.statsList, { word: state.currentWord, result: true }],
      audio: new Audio('../../../assets/sounds/mini-games/success.mp3'),
    };
  }),
  on(wrongAnswer, (state) => {
    return {
      ...state,
      statsList: [...state.statsList, { word: state.currentWord, result: false }],
      audio: new Audio('../../../assets/sounds/mini-games/fail.mp3'),
    };
  }),
  on(showNextWord, (state) => {
    const tempWord = state.list[0];
    const tempList: IWord[] = state.list.filter((elem: IWord, index: number) => index !== 0);
    const translationsSlice = state.translations.slice(0, 4);
    const tempArray = state.translations.filter((elem: string, index: number) => index > 3);
    return {
      ...state,
      list: tempList,
      currentWord: {
        ...tempWord,
        translationsArray: [...translationsSlice, tempWord.wordTranslate],
      },
      translations: [...tempArray],
      audio: new Audio(`${assetsApiUrl}/${tempWord.audio}?raw=true`),
      isTranslationChoosed: false,
    };
  }),
);

export default function reducer(state: AudiochallengeState | undefined, action: Action) {
  return audiochallengeReducer(state, action);
}
