import { createSelector, createFeatureSelector } from '@ngrx/store';

import { SpellingState } from '../models/spelling.state.model';
import { AppState } from '../models/state.model';

export const featureKey = 'spelling';

export const selectSpelling = createFeatureSelector<AppState, SpellingState>(featureKey);

export const selectWords = createSelector(selectSpelling, (state: SpellingState) => state.list);

export const selectCurrentWord = createSelector(selectSpelling, (state: SpellingState) => state.currentWord);

export const selectIsGameStarted = createSelector(selectSpelling, (state: SpellingState) => state.isGameStarted);
export const selectIsChoosed = createSelector(selectSpelling, (state: SpellingState) => state.isTranslationChoosed);
export const selectIsGameEnded = createSelector(selectSpelling, (state: SpellingState) => state.isGameEnded);

export const selectMaxRightAnswers = createSelector(selectSpelling, (state: SpellingState) =>
  Math.max(state.maxRightAnswers, state.previousMaxAnswers),
);

export const selectTrainedWords = createSelector(selectSpelling, (state: SpellingState) => state.trainedWords);

export const selectIsSoundOn = createSelector(selectSpelling, (state: SpellingState) => ({
  isSoundOn: state.isSoundOn,
  audio: state.audioSrc,
}));

export const selectIsSoundOnBool = createSelector(selectSpelling, (state: SpellingState) => state.isSoundOn);

export const selectWordsTranslations = createSelector(
  selectSpelling,
  (state: SpellingState) => state.currentWord.translationsArray,
);
