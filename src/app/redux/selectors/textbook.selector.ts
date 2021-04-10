import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../models/state.model';
import { IWord, TextbookState } from '../models/textbook.model';

const featureKey = 'textbook';

export const selectTextbook = createFeatureSelector<AppState, TextbookState>(featureKey);

export const selectWords = createSelector(selectTextbook, (state: TextbookState): IWord[] => state.words);
export const selectWordSettingsTranslation = createSelector(
  selectTextbook,
  (state: TextbookState): boolean => state.wordSettingsTranslation,
);
export const selectWordSettingsAddButtons = createSelector(
  selectTextbook,
  (state: TextbookState): boolean => state.wordSettingsAddButtons,
);

export const selectTotalWordsInGroup = createSelector(
  selectTextbook,
  (state: TextbookState) => state.totalWordsInGroup,
);
export const selectLoading = createSelector(selectTextbook, (state: TextbookState) => state.loading);
