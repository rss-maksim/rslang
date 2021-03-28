import { Action, createReducer, on } from '@ngrx/store';
import { TextbookState } from '../models/textbook.model';
import {
  loadWordsSuccess,
  setGroupWords,
  setPageWords,
  setWordSettingsAddButtons,
  setWordSettingsTranslation,
} from '../actions/textbooks.actions';

export const initialState: TextbookState = {
  words: [],
  // wordsGroup: '0',
  // wordsPage: '0',
  wordSettingsTranslation: false,
  wordSettingsAddButtons: false,
};

const _textbookReducer = createReducer(
  initialState,
  on(loadWordsSuccess, (state, { payload }) => ({ ...state, words: payload })),
  on(setGroupWords, (state, { payload }) => {
    return { ...state, wordsGroup: payload };
  }),
  on(setPageWords, (state, { payload }) => {
    return { ...state, wordsPage: payload };
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
