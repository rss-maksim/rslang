import { Action, createReducer, on } from '@ngrx/store';
import { TextbookState } from '../models/textbook.model';
import {
  calculateGroupStats,
  getGroupStats,
  loadWords,
  loadWordsSuccess,
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
  currentGroup: -1,
  userWordsPerPage: 0,
  correctPerPage: 0,
  wrongPerPage: 0,
  userWordsPerGroup: 0,
  correctPerGroup: 0,
  wrongPerGroup: 0,
  currentFilter: '',
};

const _textbookReducer = createReducer(
  initialState,
  on(loadWords, (state) => {
    return { ...state, loading: true };
  }),
  on(loadWordsSuccess, (state, { payload }) => {
    return {
      ...state,
      ...payload,
      loading: false,
    };
  }),
  on(setWordSettingsTranslation, (state, { payload }) => {
    return { ...state, wordSettingsTranslation: payload };
  }),
  on(setWordSettingsAddButtons, (state, { payload }) => {
    return { ...state, wordSettingsAddButtons: payload };
  }),
  on(getGroupStats, (state, { payload }) => {
    return { ...state, ...payload };
  }),
  on(calculateGroupStats, (state, { payload }) => {
    return { ...state, ...payload };
  }),
);

export default function textbookReducer(state: TextbookState | undefined, action: Action) {
  return _textbookReducer(state, action);
}
