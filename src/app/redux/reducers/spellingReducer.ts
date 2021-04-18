import { createReducer, on, Action } from '@ngrx/store';

import { IWord } from 'src/app/core/models/IWord';
import {
  wordsLoadedSuccess,
  spellingStarted,
  spellingEnded,
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
} from '../actions/spelling.actions';
import { SpellingState, ISpellingWord } from '../models/spelling.state.model';
import { ASSETS_API_URL } from 'src/app/core/constants/mini-games';
import { FAIL_AUDIO_URL, SUCCESS_AUDIO_URL } from 'src/app/mini-games/constants/spelling';
import { Answer } from 'src/app/core/models/IAnswer';

const initialWord: ISpellingWord = {
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

export const initialState: SpellingState = {
  list: [],
  trainedWords: [],
  isGameStarted: false,
  isGameEnded: false,
  currentWord: initialWord,
  isTranslationChoosed: false,
  translations: [],
  maxRightAnswers: 0,
  previousMaxAnswers: 0,
  isSoundOn: true,
  audioSrc: '',
};

const spellingReducer = createReducer(
  initialState,
  on(wordsLoadedSuccess, (state, { payload }) => {
    const tempWord = payload[0];
    const tempList: IWord[] = payload.filter((elem: IWord, index: number) => index !== 0);
    return {
      ...state,
      list: tempList,
      currentWord: { ...tempWord, translationsArray: [] },
      audioSrc: `${ASSETS_API_URL}/${tempWord.audio}?raw=true`,
    };
  }),

  on(spellingStarted, (state) => {
    return { ...state, isGameStarted: true };
  }),
  on(spellingEnded, (state) => {
    return { ...state, isGameStarted: false };
  }),
  on(translationChoosed, (state) => {
    return { ...state, isTranslationChoosed: true };
  }),
  on(rightAnswer, (state) => {
    return {
      ...state,
      trainedWords: [
        ...state.trainedWords,
        {
          id: state.currentWord.id,
          word: state.currentWord.word,
          translation: state.currentWord.wordTranslate,
          timeStamp: Date.now(),
          result: Answer.CORRECT,
          audio: state.currentWord.audio,
          userWord: state.currentWord.userWord,
        },
      ],
      audioSrc: SUCCESS_AUDIO_URL,
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
      trainedWords: [
        ...state.trainedWords,
        {
          id: state.currentWord.id,
          word: state.currentWord.word,
          translation: state.currentWord.wordTranslate,
          timeStamp: Date.now(),
          result: Answer.WRONG,
          audio: state.currentWord.audio,
          userWord: state.currentWord.userWord,
        },
      ],
      audioSrc: FAIL_AUDIO_URL,
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
  on(gameOver, (state) => ({ ...state, isGameEnded: true })),
  on(soundOn, (state) => ({ ...state, isSoundOn: true })),
  on(soundOf, (state) => ({ ...state, isSoundOn: false })),
  on(closeGame, (state) => ({ ...initialState })),
);

export default function reducer(state: SpellingState | undefined, action: Action) {
  return spellingReducer(state, action);
}
