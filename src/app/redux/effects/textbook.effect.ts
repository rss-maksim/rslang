import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { AppState } from '../models/state.model';

import { WordsService } from 'src/app/core/services/words.service';
import { loadWords, updateUserWord, updateUserWordSuccess, wordsUpdatedSuccess } from '../actions/textbooks.actions';
import { updateUserWords } from 'src/app/redux/actions/textbooks.actions';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { UserWordModel } from 'src/app/core/models/word.model';
import { filters } from 'src/app/core/constants/textbook';
import { Answer } from 'src/app/core/models/IAnswer';
import { selectIdIsAuth } from '../selectors/user.selector';

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
      ofType(loadWords, updateUserWordSuccess),
      concatLatestFrom(() => this.store.select(selectIdIsAuth)),
      mergeMap(([{ payload }, authObj]) => {
        const { group, page, wordsPerPage, filter } = payload;
        if (authObj.isAuth || this.userId) {
          let filterToLoad = filters.textBook;
          if (filter !== undefined) {
            filterToLoad = filter;
          }
          console.log(filter);
          return this.wordsService
            .getUserAggregatedWords(authObj.userId || this.userId, {
              group,
              page,
              wordsPerPage: wordsPerPage || '20',
              filter: filterToLoad,
            })
            .pipe(
              map((item: any) => {
                console.log(item);
                const wordsArray = item[0].paginatedResults.map((word: any) => {
                  return { ...word, id: word._id };
                });
                const totalWordsInGroup = item[0].totalCount[0].count;
                return {
                  type: '[Textbook]  Load_Words_Success',
                  payload: { words: wordsArray, totalWordsInGroup: +totalWordsInGroup },
                };
              }),
            );
        }
        return this.wordsService.getAll({ group, page }).pipe(
          map((item: any) => {
            console.log(item, 'getAll');
            return { type: '[Textbook]  Load_Words_Success', payload: { words: item, totalWordsInGroup: 600 } };
          }),
        );
      }),
    );
  });

  updateWord$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserWord),
      mergeMap(({ payload }) => {
        console.log(payload);
        const { word, group, page, difficulty, filter } = payload;
        let filterToLoad = filters.textBook;
        if (filter !== undefined) {
          filterToLoad = filters[filter];
        }
        if (word.userWord) {
          return this.wordsService
            .updateUserWord(this.userId, word.id, {
              difficulty: difficulty,
            })
            .pipe(
              map(() => updateUserWordSuccess({ payload: { group, page, filter: filterToLoad, wordsPerPage: '20' } })),
            );
        } else {
          return this.wordsService
            .createUserWord(this.userId, word.id, {
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
        const wordsArr = this.createUserWordsArr(payload);
        return this.wordsService.updateUserWords(this.userId, wordsArr).pipe(
          map((item: any) => {
            console.log(item);
            return wordsUpdatedSuccess({ payload: item });
          }),
        );
      }),
    );
  });

  createUserWordsArr(arr: ITrainedWord[]): UserWordModel[] {
    return arr.map((elem) => {
      let difficulty = 'learning';
      let correctAnswersNum = 0;
      let wrongAnswersNum = 0;
      if (elem.userWord?.difficulty) {
        difficulty = elem.userWord.difficulty;
      }
      if (elem.userWord?.optional) {
        correctAnswersNum = +elem.userWord.optional.correctAnswers;
        wrongAnswersNum = +elem.userWord.optional.wrongAnswers;
      }
      if (elem.result === Answer.CORRECT) {
        correctAnswersNum += 1;
      } else if (elem.result === Answer.WRONG) {
        wrongAnswersNum += 1;
      }
      return {
        wordId: elem.id,
        difficulty: difficulty,
        optional: {
          correctAnswers: correctAnswersNum.toString(),
          wrongAnswers: wrongAnswersNum.toString(),
        },
      };
    });
  }
}
