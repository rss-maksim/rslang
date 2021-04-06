import { Action, createReducer, on } from '@ngrx/store';
import { TextbookState } from '../models/textbook.model';
import { loadWordsSuccess, setWordSettingsAddButtons, setWordSettingsTranslation } from '../actions/textbooks.actions';

export const initialState: TextbookState = {
  words: [],
  wordSettingsTranslation: true,
  wordSettingsAddButtons: true,
  wordsHards: [],
  wordsDeleted: [],
};

const _textbookReducer = createReducer(
  initialState,
  on(loadWordsSuccess, (state, { payload }) => {
    return { ...state, words: payload };
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
