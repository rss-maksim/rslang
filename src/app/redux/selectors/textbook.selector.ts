import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../models/state.model';
import { IWord, TextbookState } from '../models/textbook.model';

const featureKey = 'textbook';

export const selectTextbook = createFeatureSelector<AppState, TextbookState>(featureKey);

export const selectWords = createSelector(selectTextbook, (state: TextbookState): IWord[] => state.words);
// export const selectWordsGroup = createSelector(selectTextbook, (state: TextbookState): string => state.wordsGroup);
// export const selectWordsPage = createSelector(selectTextbook, (state: TextbookState): string => state.wordsPage);
export const selectWordSettingsTranslation = createSelector(
  selectTextbook,
  (state: TextbookState): boolean => state.wordSettingsTranslation,
);
export const selectWordSettingsAddButtons = createSelector(
  selectTextbook,
  (state: TextbookState): boolean => state.wordSettingsAddButtons,
);
