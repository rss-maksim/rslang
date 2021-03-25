import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { fetchUser, logoutUser, updateUser } from '../actions/user.actions';
import { UserModel } from '../models/user.model';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      mergeMap(({ payload: id }) => {
        if (id) {
          return this.userService.getUser(id).pipe(
            map((user) => updateUser({ payload: user as UserModel })),
            catchError(() => EMPTY),
          );
        }
        return EMPTY;
      }),
    ),
  );

  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutUser),
        tap(() => this.authService.logout()),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private userService: UserService, private authService: AuthService) {}
}
