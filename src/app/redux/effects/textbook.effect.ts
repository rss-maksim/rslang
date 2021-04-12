import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, delay, withLatestFrom, switchMap, tap } from 'rxjs/operators';

import { UserService } from 'src/app/core/services/user.service';
import { AppState } from '../models/state.model';
import { WordsService } from 'src/app/core/services/words.service';
import {
  calculateGroupStats,
  doNothing,
  getGroupStats,
  loadWords,
  updateGroupStats,
  updateUserWord,
  updateUserWordSuccess,
  wordsUpdatedSuccess,
} from '../actions/textbooks.actions';
import { updateUserWords } from 'src/app/redux/actions/textbooks.actions';
import { filters } from 'src/app/core/constants/textbook';
import { selectIdIsAuth, selectUserId } from '../selectors/user.selector';
import { TextbookHelperService } from '../../textbook/services/textbook-helper.service';
import { selectCurrentGroupFilter, selectGroupStatsInfo } from '../selectors/textbook.selector';
import { EMPTY } from 'rxjs/internal/observable/empty';

@Injectable()
export class TextbookEffects {
  constructor(
    private wordsService: WordsService,
    private actions$: Actions,
    public userServise: UserService,
    private store: Store<AppState>,
    private textbookHelperService: TextbookHelperService,
  ) {}
  group = '0';
  page = '0';
  userId = this.userServise.getUserId();

  loadWords$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(loadWords, updateUserWordSuccess),
        concatLatestFrom(() => this.store.select(selectIdIsAuth)),
        mergeMap(([{ payload }, authObj]) => {
          const { group, page, wordsPerPage, filter } = payload;
          const userId = authObj.userId || this.userServise.getUserId();
          if (authObj.isAuth || userId) {
            let filterToLoad = filters.textBook;
            if (filter !== undefined) {
              filterToLoad = filter;
            }
            return this.wordsService
              .getUserAggregatedWords(userId, {
                group,
                page,
                wordsPerPage: wordsPerPage || '20',
                filter: filterToLoad,
              })
              .pipe(
                map((item: any) => {
                  const payload = { ...this.textbookHelperService.createPageData(item), currentFilter: filterToLoad };
                  return {
                    type: '[Textbook]  Load_Words_Success',
                    payload,
                  };
                }),
              );
          }
          return this.wordsService.getAll({ group, page }).pipe(
            map((item: any) => {
              return { type: '[Textbook]  Load_Words_Success', payload: { words: item, totalWordsInGroup: 600 } };
            }),
          );
        }),
      )
      .pipe(delay(700));
  });

  updateWord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserWord),
      concatLatestFrom(() => this.store.select(selectUserId)),
      mergeMap(([{ payload }, authId]) => {
        const { word, group, page, difficulty, filter } = payload;
        const userId = authId || this.userServise.getUserId();
        let filterToLoad = filters.textBook;
        if (filter !== undefined) {
          filterToLoad = filters[filter];
        }
        if (word.userWord) {
          return this.wordsService
            .updateUserWord(userId, word.id, {
              difficulty: difficulty,
            })
            .pipe(
              map(() => updateUserWordSuccess({ payload: { group, page, filter: filterToLoad, wordsPerPage: '20' } })),
            );
        } else {
          return this.wordsService
            .createUserWord(userId, word.id, {
              difficulty: difficulty,
            })
            .pipe(
              map(() => updateUserWordSuccess({ payload: { group, page, filter: filterToLoad, wordsPerPage: '20' } })),
            );
        }
      }),
    );
  });

  updateUserWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserWords),
      mergeMap(({ payload }) => {
        const wordsArr = this.textbookHelperService.createUserWordsArr(payload);
        return this.wordsService.updateUserWords(this.userId, wordsArr).pipe(
          map((item: any) => {
            return wordsUpdatedSuccess({ payload: item });
          }),
        );
      }),
    );
  });

  getGroupStats$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(updateGroupStats),
        withLatestFrom(this.store.select(selectIdIsAuth), this.store.select(selectCurrentGroupFilter)),
        mergeMap(([{ payload }, { userId, isAuth }, { currentGroup, currentFilter }]) => {
          const id = userId || this.userServise.getUserId();
          const { group, filter } = payload;
          let filterToLoad = filters.textBook;
          if (filter !== undefined) {
            filterToLoad = filter;
          }
          if (((group && +group !== currentGroup) || currentFilter !== filterToLoad) && (isAuth || id)) {
            return this.wordsService
              .getUserAggregatedWords(id, {
                group,
                wordsPerPage: '600',
                filter: filterToLoad,
              })
              .pipe(
                map((item: any[]) => {
                  const [{ paginatedResults }] = item;
                  const groupStats = this.textbookHelperService.createGroupInfo(paginatedResults);
                  return getGroupStats({ payload: groupStats });
                }),
              );
          }
          return EMPTY;
        }),
      )
      .pipe(delay(2000));
  });

  updateGroupStats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserWord),
      tap(({ payload }) => {
        console.log(payload);
      }),
      concatLatestFrom(() => this.store.select(selectGroupStatsInfo)),
      map(([{ payload }, groupStatsInfo]) => {
        const data = this.textbookHelperService.calculateGroupInfo(payload, groupStatsInfo);
        console.log(data);
        return calculateGroupStats({
          payload: {
            ...data,
          },
        });
      }),
    );
  });
}
