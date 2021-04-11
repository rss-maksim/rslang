import { Action, createReducer, on } from '@ngrx/store';
import { TextbookState } from '../models/textbook.model';
import {
  loadWords,
  loadWordsSuccess,
  setLoader,
  setWordSettingsAddButtons,
  setWordSettingsTranslation,
} from '../actions/textbooks.actions';

export const initialState: TextbookState = {
  words: [],
  wordSettingsTranslation: true,
  wordSettingsAddButtons: true,
  wordsHards: [],
  wordsDeleted: [],
  totalWordsInGroup: 600,
  loading: false,
};

const _textbookReducer = createReducer(
  initialState,
  on(loadWords, (state) => {
    return { ...state, loading: true };
  }),
  on(loadWordsSuccess, (state, { payload }) => {
    return { ...state, words: payload.words, totalWordsInGroup: payload.totalWordsInGroup, loading: false };
  }),
  on(setWordSettingsTranslation, (state, { payload }) => {
    return { ...state, wordSettingsTranslation: payload };
  }),
  on(setWordSettingsAddButtons, (state, { payload }) => {
    return { ...state, wordSettingsAddButtons: payload };
  }),
);

export default function textbookReducer(state: TextbookState | undefined, action: Action) {
  return _textbookReducer(state, action);
}
