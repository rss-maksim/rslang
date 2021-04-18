import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { TeamService } from '../../main/services/team.service';
import { fetchTeam, loadTeam } from '../actions';
import { Teammate } from '../models/teammate.model';

@Injectable()
export class TeamEffects {
  loadTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTeam),
      mergeMap(() =>
        this.teamService.getAll().pipe(
          map((teammates) => loadTeam({ payload: teammates as Teammate[] })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private teamService: TeamService) {}
}
