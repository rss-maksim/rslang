import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { AppState } from '../models/state.model';

import { WordsService } from 'src/app/core/services/words.service';
import { wordsLoadedSuccess } from '../actions/audiochallenge.actions';
import {
  deleteUserWords,
  deleteUserWordsSuccess,
  loadHardWords,
  loadWords,
  markWordAsHard,
  markWordAsHardSuccess,
} from '../actions/textbooks.actions';
import { selectUserId } from '../selectors/user.selector';

@Injectable()
export class TextbookEffects {
  constructor(
    private wordsService: WordsService,
    private actions$: Actions,
    public userServise: UserService,
    private store: Store<AppState>,
  ) {}
  group = '0';
  page = '0';
  userId = this.userServise.getUserId();

  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWords, deleteUserWordsSuccess, markWordAsHardSuccess),
      mergeMap(({ payload }) => {
        const { group, page, wordsPerPage } = payload;
        if (this.userId) {
          return this.wordsService
            .getUserAggregatedWords(this.userId, {
              group,
              page,
              wordsPerPage,
              filter: '{"$or":[{"$and":[{"userWord.optional.deleted":null}]},{"userWord":null}]}',
            })
            .pipe(
              map((item: any) => {
                const wordsArray = item[0].paginatedResults.map((word: any) => {
                  return { ...word, id: word._id };
                });
                return {
                  type: '[Textbook]  Load_Words_Success',
                  payload: wordsArray,
                };
              }),
            );
        }
        return this.wordsService.getAll({ group, page }).pipe(
          map((item: any) => {
            return { type: '[Textbook]  Load_Words_Success', payload: item };
          }),
        );
      }),
    );
  });

  deleteWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUserWords),
      mergeMap(({ payload }) => {
        console.log(payload);
        const { word, group, page } = payload;
        if (word.userWord) {
          return this.wordsService
            .updateUserWord(this.userId, word.id, {
              optional: {
                deleted: true,
              },
            })
            .pipe(map(() => deleteUserWordsSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        } else {
          return this.wordsService
            .createUserWord(this.userId, word.id, {
              difficulty: 'deleted',
            })
            .pipe(map(() => deleteUserWordsSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        }
      }),
    );
  });

  hardWord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(markWordAsHard),
      mergeMap(({ payload }) => {
        const { word, group, page } = payload;
        if (word.userWord) {
          return this.wordsService
            .updateUserWord(this.userId, word.id, {
              difficulty: 'hard',
            })
            .pipe(map(() => markWordAsHardSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        } else {
          return this.wordsService
            .createUserWord(this.userId, word.id, {
              difficulty: 'hard',
            })
            .pipe(map(() => markWordAsHardSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        }
      }),
    );
  });
  // исправить обратно в getUserAggregatedWords с undefined на null
  loadHardDeletedWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadHardWords),
      concatLatestFrom(() => this.store.select(selectUserId)),
      mergeMap(([{ payload }, userId]) => {
        console.log(userId);
        return this.wordsService
          .getUserAggregatedWords(userId, {
            ...payload,
            wordsPerPage: '20',
          })
          .pipe(
            map((item: any) => {
              console.log(item);

              const wordsArray = item[0].paginatedResults.map((word: any) => {
                return { ...word, id: word._id };
              });
              return {
                type: '[Textbook]  Load_Words_Success',
                payload: wordsArray,
              };
            }),
          );
      }),
    );
  });
}
