import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState, HomeState } from '../models/state.model';

export const featureKey = 'home';

export const selectHome = createFeatureSelector<AppState, HomeState>(featureKey);

export const selectCounter = createSelector(selectHome, (state: HomeState): number => state.counter);
