import { createReducer, on, Action } from '@ngrx/store';

import { loadTeam } from '../actions';
import { HomeState } from '../models/home.state.model';

export const initialState: HomeState = {
  teammates: [],
};

const homeReducer = createReducer<HomeState>(
  initialState,
  // @ts-ignore
  on(loadTeam, (state: HomeState, { payload }) => ({ ...state, teammates: payload })),
);

export default function reducer(state: HomeState | undefined, action: Action) {
  return homeReducer(state, action);
}
