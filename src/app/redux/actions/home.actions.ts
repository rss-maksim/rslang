import { createAction, props } from '@ngrx/store';

import { Teammate } from '../models/teammate.model';

export const fetchTeam = createAction('[Team/API] Fetch Team');

export const loadTeam = createAction('[Home page] Update Teammates', props<{ payload: Teammate[] }>());
