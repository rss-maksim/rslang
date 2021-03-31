import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';

import { WordsService } from 'src/app/core/services/words.service';
import { loadWords } from '../actions/textbooks.actions';

@Injectable()
export class TextbookEffects {
  constructor(private wordsService: WordsService, private actions$: Actions) {}
  group = '0';
  page = '0';

  loadWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadWords),
      mergeMap(({ payload }) => {
        const { group, page } = payload;
        return this.wordsService.getAll({ group, page }).pipe(
          map((item: any) => {
            return { type: '[Textbook]  Load_Words_Success', payload: item };
          }),
        );
      }),
    );
  });
}
