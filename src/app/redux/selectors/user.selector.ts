import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../models/state.model';
import { UserState } from '../models/user.state.model';
import { UserModel } from '../models/user.model';

const featureKey = 'user';

export const selectUserState = createFeatureSelector<AppState, UserState>(featureKey);

export const selectUser = createSelector(selectUserState, (state: UserState): UserModel | null => state.user);

export const selectIsAuthorized = createSelector(selectUserState, (state: UserState): boolean => state.isAuthorized);
