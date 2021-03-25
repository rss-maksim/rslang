import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IWord } from '../actions/audiochallenge.actions';

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
export const selectAudio = createSelector(selectAudiochallenge, (state: AudiochallengeState) => state.audio);
export const selectImage = createSelector(selectAudiochallenge, (state: AudiochallengeState) => state.image);
export const selectIsChoosed = createSelector(
  selectAudiochallenge,
  (state: AudiochallengeState) => state.isTranslationChoosed,
);
