import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AudiochallengeState } from '../models/audiochallenge.state.model';
import { AppState } from '../models/state.model';

export const featureKey = 'audiochallenge';

export const selectAudiochallenge = createFeatureSelector<AppState, AudiochallengeState>(featureKey);

export const selectWords = createSelector(selectAudiochallenge, (state: AudiochallengeState) => state.list);

export const selectCurrentWord = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.currentWord,
);

export const selectIsGameStarted = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.isGameStarted,
);
export const selectIsChoosed = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.isTranslationChoosed,
);
export const selectIsGameEnded = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.isGameEnded,
);

export const selectMaxRightAnswers = createSelector(selectAudiochallenge, (state: AudiochallengeState) =>
  Math.max(state.maxRightAnswers, state.previousMaxAnswers),
);

export const selectTrainedWords = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.trainedWords,
);

export const selectIsSoundOn = createSelector(selectAudiochallenge, (state: AudiochallengeState) => ({
  isSoundOn: state.isSoundOn,
  audio: state.audioSrc,
}));

export const selectIsSoundOnBool = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.isSoundOn,
);

export const selectWordsTranslations = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.currentWord.translationsArray,
);
