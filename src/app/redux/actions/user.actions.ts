import { createAction, props } from '@ngrx/store';

import { UserModel } from '../models/user.model';

export const fetchUser = createAction('[User/API] Fetch User', props<{ payload: string }>());

export const updateUser = createAction('[User] Update User', props<{ payload: UserModel }>());

export const logoutUser = createAction('[User] Logout User');
