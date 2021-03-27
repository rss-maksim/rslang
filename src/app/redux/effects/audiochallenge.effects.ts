import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { MiniGamesHttpService } from '../../services/mini-games-http.service';
import { AppState } from '../models/state.model';
import { selectAudio, selectWords, selectCurrentWord } from 'src/app/redux/selectors/audiochallenge.selectors';
import {
  loadWords,
  showNextWord,
  playWordSound,
  wordsLoadedSuccess,
  checkGameOver,
  IWord,
  checkAnswer,
  rightAnswer,
  wrongAnswer,
} from '../actions/audiochallenge.actions';

@Injectable()
export class AudiochallengeEffects {
  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWords),
      switchMap(() => {
        return this.wordsService.getWords().pipe(
          map((words) => ({
            type: '[AudiochallengeGameComponent] Words Loaded Success',
            payload: this.wordsService.shuffleArray(Object.values(words)),
          })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  loadRandomTranslations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWords),
      switchMap(() => {
        return this.wordsService.getRandomTranslations().pipe(
          map((words) => ({
            type: '[AudiochallengeGameComponent] Translation Loaded Success',
            payload: this.wordsService.getValuesArray(Object.values(words)),
          })),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  playSound$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(playWordSound, wordsLoadedSuccess, showNextWord, rightAnswer, wrongAnswer),
        concatLatestFrom((action) => this.store.select(selectAudio)),
        tap(([action, audio]) => audio.play()),
      );
    },
    { dispatch: false },
  );

  checkAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkAnswer),
      concatLatestFrom(() => this.store.select(selectCurrentWord)),
      map(([action, word]) => {
        return action.payload === word.wordTranslate
          ? { type: '[AudiochallengeGameComponent] Right Answer' }
          : { type: '[AudiochallengeGameComponent] Wrong Answer' };
      }),
    );
  });

  checkGameOver$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkGameOver),
      concatLatestFrom(() => this.store.select(selectWords)),
      map(([action, words]) => {
        return words.length < 1
          ? { type: '[AudiochallengeGameComponent] Game Over' }
          : { type: '[AudiochallengeGameComponent] Show Next Word' };
      }),
    );
  });

  constructor(private actions$: Actions, private wordsService: MiniGamesHttpService, private store: Store<AppState>) {}
}
