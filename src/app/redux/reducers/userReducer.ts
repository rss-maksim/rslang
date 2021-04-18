import { createReducer, on, Action } from '@ngrx/store';

import { UserState } from '../models/user.state.model';
import { updateUser, logoutUser } from '../actions/user.actions';

export const initialState: UserState = {
  user: null,
  isAuthorized: false,
};

const userReducer = createReducer<UserState>(
  initialState,
  on(updateUser, (state: UserState, { payload }) => ({ ...state, user: payload, isAuthorized: true })),
  on(logoutUser, (state: UserState) => ({ ...state, user: null, isAuthorized: false })),
);

export default function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
