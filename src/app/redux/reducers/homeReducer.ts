import { createReducer, on, Action } from '@ngrx/store';

import { increment, decrement, reset } from '../actions';
import { HomeState } from '../models/state.model';

export const initialState: HomeState = {
    counter: 0,
};

const homeReducer = createReducer<HomeState>(
    initialState,
    // @ts-ignore
    on(increment, (state: HomeState) => ({ ...state, counter: state.counter + 1 })),
    // @ts-ignore
    on(decrement, (state: HomeState) => ({ ...state, counter: state.counter - 1 })),
    // @ts-ignore
    on(reset, (state: HomeState) => ({ ...state, counter: 0 })),
);

export default function reducer(state: HomeState | undefined, action: Action) {
    return homeReducer(state, action);
}
