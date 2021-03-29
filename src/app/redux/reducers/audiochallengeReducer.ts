import { createReducer, on, Action } from '@ngrx/store';
import { IAudiochallengeWord } from 'src/app/redux/models/IAudiochallengeWord';
import { IWord } from 'src/app/core/models/IWord';
import {
  wordsLoadedSuccess,
  audiochallengeStarted,
  audiochallengeEnded,
  translationChoosed,
  showNextWord,
  translationsLoadedSuccess,
  rightAnswer,
  wrongAnswer,
  gameOver,
  soundOf,
  soundOn,
  translationsShuffled,
  closeGame,
} from '../actions/audiochallenge.actions';
import { AudiochallengeState } from '../models/audiochallenge.state.model';
import { ASSETS_API_URL } from 'src/app/core/constants/mini-games';
import { FAIL_AUDIO_URL, SUCCESS_AUDIO_URL } from 'src/app/core/constants/audiochallenge-game';

const initialWord: IAudiochallengeWord = {
  id: '',
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
  translationsArray: [],
};

export const initialState: AudiochallengeState = {
  list: [],
  statsList: [],
  isGameStarted: false,
  isGameEnded: false,
  currentWord: initialWord,
  audio: new Audio(),
  isTranslationChoosed: false,
  translations: [],
  maxRightAnswers: 0,
  previousMaxAnswers: 0,
  isSoundOn: true,
};

const audiochallengeReducer = createReducer(
  initialState,
  on(wordsLoadedSuccess, (state, { payload }) => {
    const tempWord = payload[0];
    const tempList: IWord[] = payload.filter((elem: IWord, index: number) => index !== 0);
    return {
      ...state,
      list: tempList,
      currentWord: { ...tempWord, translationsArray: [] },
      audio: new Audio(`${ASSETS_API_URL}/${tempWord.audio}?raw=true`),
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
      audio: new Audio(SUCCESS_AUDIO_URL),
      maxRightAnswers: state.maxRightAnswers + 1,
    };
  }),
  on(wrongAnswer, (state) => {
    let counter = 0;
    state.maxRightAnswers > state.previousMaxAnswers
      ? (counter = state.maxRightAnswers)
      : (counter = state.previousMaxAnswers);
    return {
      ...state,
      statsList: [...state.statsList, { word: state.currentWord, result: false }],
      audio: new Audio(FAIL_AUDIO_URL),
      maxRightAnswers: 0,
      previousMaxAnswers: counter,
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
      audio: new Audio(`${ASSETS_API_URL}/${tempWord.audio}?raw=true`),
      isTranslationChoosed: false,
    };
  }),
  on(translationsShuffled, (state, { payload }) => {
    return { ...state, currentWord: { ...state.currentWord, translationsArray: payload } };
  }),
  on(gameOver, (state) => {
    return { ...state, isGameEnded: true };
  }),
  on(soundOn, (state) => ({ ...state, isSoundOn: true })),
  on(soundOf, (state) => ({ ...state, isSoundOn: false })),
  on(closeGame, (state) => ({ ...initialState })),
);

export default function reducer(state: AudiochallengeState | undefined, action: Action) {
  return audiochallengeReducer(state, action);
}
