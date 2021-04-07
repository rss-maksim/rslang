import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { AppState } from '../models/state.model';

import { WordsService } from 'src/app/core/services/words.service';
import { wordsLoadedSuccess, wrongAnswer } from '../actions/audiochallenge.actions';
import {
  deleteUserWords,
  deleteUserWordsSuccess,
  loadHardWords,
  loadWords,
  markWordAsHard,
  markWordAsHardSuccess,
  wordsUpdatedSuccess,
} from '../actions/textbooks.actions';
import { selectUserId } from '../selectors/user.selector';
import { updateUserWords } from 'src/app/redux/actions/textbooks.actions';
import { ElementSchemaRegistry, identifierModuleUrl } from '@angular/compiler';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { UserWordModel } from 'src/app/core/models/word.model';
import { Answer } from 'src/app/core/models/ISprintGame';
import { filters } from 'src/app/core/constants/textbook';

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
              filter: filters.textBook,
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
  loadHardDeletedWords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadHardWords),
      mergeMap(({ payload }) => {
        return this.wordsService
          .getUserAggregatedWords(this.userId, {
            ...payload,
            wordsPerPage: '20',
          })
          .pipe(
            map((item: any) => {
              console.log(this.userId);
              const wordsArray = item[0].paginatedResults.map((word: any) => {
                return { ...word, id: word._id };
              });
              const totalWordsInGroup = item[0].totalCount[0]?.count || 0;
              return {
                type: '[Textbook]  Load_Words_Success',
                payload: { words: wordsArray, totalWordsInGroup: +totalWordsInGroup },
              };
            }),
          );
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
