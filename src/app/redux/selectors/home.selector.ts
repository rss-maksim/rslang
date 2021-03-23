import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../models/state.model';
import { HomeState } from '../models/home.state.model';
import { Teammate } from '../models/teammate.model';

export const featureKey = 'home';

export const selectHome = createFeatureSelector<AppState, HomeState>(featureKey);

export const selectTeammates = createSelector(selectHome, (state: HomeState): Teammate[] => state.teammates);
