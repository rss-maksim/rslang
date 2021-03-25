import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { MiniGamesHttpService } from '../../services/mini-games-http.service';
import { AppState } from '../models/state.model';
import { selectAudio } from 'src/app/redux/selectors/audiochallenge.selectors';
import {
  getCurrentWord,
  loadWords,
  nextWord,
  playWordSound,
  wordByIdLoadedSuccess,
} from '../actions/audiochallenge.actions';
import { IWord } from 'src/app/redux/actions/audiochallenge.actions';

@Injectable()
export class AudiochallengeEffects {
  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWords),
      mergeMap(() => {
        return this.wordsService.getWords().pipe(
          map((words) => ({ type: '[AudiochallengeGameComponent] Words Loaded Success', payload: words })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  loadWordById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentWord),
      mergeMap(({ payload }) => {
        return this.wordsService.getWordById(payload).pipe(
          map((word) => ({ type: '[AudiochallengeGameComponent] Word By Id Loaded Success', payload: word })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  playSound$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(playWordSound, wordByIdLoadedSuccess),
        concatLatestFrom((action) => this.store.select(selectAudio)),
        tap(([action, audio]) => audio.play()),
      );
    },
    { dispatch: false },
  );

  getNextWord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(nextWord),
      mergeMap(({ payload }) => {
        return this.wordsService.getWordById(payload).pipe(
          map((word) => ({ type: '[AudiochallengeGameComponent] Word By Id Loaded Success', payload: word })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private wordsService: MiniGamesHttpService, private store: Store<AppState>) {}
}
