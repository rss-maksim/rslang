import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { MiniGamesHttpService } from '../../services/mini-games-http.service';
import { MiniGamesHelperService } from 'src/app/services/mini-games-helper.servise';
import { AppState } from '../models/state.model';
import {
  selectWords,
  selectCurrentWord,
  selectIsSoundOn,
  selectWordsTranslations,
} from 'src/app/redux/selectors/spelling.selectors';
import {
  loadWords,
  showNextWord,
  playWordSound,
  wordsLoadedSuccess,
  checkGameOver,
  checkAnswer,
  rightAnswer,
  wrongAnswer,
  translationsLoadedSuccess,
  gameOver,
  translationsShuffled,
} from '../actions/spelling.actions';
import { ASSETS_API_URL } from 'src/app/core/constants/mini-games';

@Injectable()
export class SpellingEffects {
  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWords),
      switchMap(({ payload }) => {
        return this.wordsHttpService.getWords(payload).pipe(
          map((words) => {
            if (words[0].paginatedResults) {
              words = words[0].paginatedResults.map((word: any) => {
                return { ...word, id: word._id };
              });
            }
            return wordsLoadedSuccess({ payload: this.wordsHelper.shuffleArray(Object.values(words)) });
          }),
          catchError(() => EMPTY),
        );
      }),
    );
  });

  playSound$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(playWordSound, wordsLoadedSuccess, showNextWord),
        concatLatestFrom(() => this.store.select(selectCurrentWord)),
        tap(([, currentWord$]) => {
          if (currentWord$ && currentWord$?.audio) {
            const audio = new Audio(`${ASSETS_API_URL}/${currentWord$.audio}?raw=true`);
            audio.play();
          }
        }),
      );
    },
    { dispatch: false },
  );

  playGameSound$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(rightAnswer, wrongAnswer),
        concatLatestFrom(() => this.store.select(selectIsSoundOn)),
        tap(([, options]) => {
          if (options && options?.isSoundOn && options?.audio) {
            const audio = new Audio(`${options.audio}`);
            audio.play();
          }
        }),
      );
    },
    { dispatch: false },
  );

  checkAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkAnswer),
      concatLatestFrom(() => this.store.select(selectCurrentWord)),
      map(([action, word]) => {
        return action.payload.toLowerCase() === word.word.toLowerCase() ? rightAnswer() : wrongAnswer();
      }),
    );
  });

  checkGameOver$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkGameOver),
      concatLatestFrom(() => this.store.select(selectWords)),
      map(([, words]) => {
        return words.length < 1 ? gameOver() : showNextWord();
      }),
    );
  });

  shuffleTranslations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(translationsLoadedSuccess, showNextWord),
      concatLatestFrom(() => this.store.select(selectWordsTranslations)),
      map(([, translations]) => {
        return translationsShuffled({ payload: this.wordsHelper.shuffleArray([...translations]) });
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private wordsHttpService: MiniGamesHttpService,
    private store: Store<AppState>,
    private wordsHelper: MiniGamesHelperService,
  ) {}
}
