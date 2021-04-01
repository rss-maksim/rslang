import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';

import { WordsService } from 'src/app/core/services/words.service';
import { deleteUserWords, deleteUserWordsSuccess, loadWords } from '../actions/textbooks.actions';

@Injectable()
export class TextbookEffects {
  constructor(private wordsService: WordsService, private actions$: Actions, public userServise: UserService) {}
  group = '0';
  page = '0';
  userId = this.userServise.getUserId();

  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWords, deleteUserWordsSuccess),
      mergeMap(({ payload }) => {
        const { group, page, wordsPerPage } = payload;
        return this.wordsService.getUserAggregatedWords(this.userId, { group, page, wordsPerPage }).pipe(
          map((item: any) => {
            return { type: '[Textbook]  Load_Words_Success', payload: item[0].paginatedResults };
          }),
        );
      }),
    );
  });

  deleteWords$() {
    return this.actions$.pipe(
      ofType(deleteUserWords),
      mergeMap(({ payload }) => {
        const { id, difficulty, group, page } = payload;
        if (difficulty) {
          return this.wordsService
            .updateUserWord(this.userId, id, { difficulty: 'deleted' })
            .pipe(map(() => deleteUserWordsSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        } else {
          return this.wordsService
            .createUserWord(this.userId, id, { difficulty: 'deleted' })
            .pipe(map(() => deleteUserWordsSuccess({ payload: { group, page, wordsPerPage: '20' } })));
        }
      }),
    );
  }
}
