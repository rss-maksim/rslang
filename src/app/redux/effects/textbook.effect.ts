import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

import { WordsService } from 'src/app/core/services/words.service';
import { wordsLoadedSuccess } from '../actions/audiochallenge.actions';
import {
  deleteUserWords,
  deleteUserWordsSuccess,
  loadWords,
  markWordAsHard,
  markWordAsHardSuccess,
} from '../actions/textbooks.actions';

@Injectable()
export class TextbookEffects {
  constructor(private wordsService: WordsService, private actions$: Actions, public userServise: UserService) {}
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
        const { id, userWord, group, page } = payload;
        if (userWord) {
          return this.wordsService
            .updateUserWord(this.userId, id, {
              optional: {
                deleted: true,
              },
            })
            .pipe(map(() => deleteUserWordsSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        } else {
          return this.wordsService
            .createUserWord(this.userId, id, {
              optional: {
                deleted: true,
              },
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
        const { id, userWord, group, page } = payload;
        if (userWord) {
          console.log(userWord);
          return this.wordsService
            .updateUserWord(this.userId, id, {
              difficulty: 'hard',
            })
            .pipe(map(() => markWordAsHardSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        } else {
          console.log(userWord);
          return this.wordsService
            .createUserWord(this.userId, id, {
              difficulty: 'hard',
            })
            .pipe(map(() => markWordAsHardSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        }
      }),
    );
  });
}
