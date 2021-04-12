import { Injectable } from '@angular/core';

import { Answer } from 'src/app/core/models/IAnswer';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { UserWordModel } from 'src/app/core/models/word.model';
import { IWord } from 'src/app/redux/models/textbook.model';

@Injectable({
  providedIn: 'root',
})
export class TextbookHelperService {
  constructor() {}

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

  createPageData(arr: any[]) {
    const [{ paginatedResults, totalCount }] = arr;
    const wordsArray = paginatedResults.map((word: any) => {
      return { ...word, id: word._id };
    });
    let count = 0;
    if (totalCount.length) {
      [{ count }] = totalCount;
    }
    console.log(wordsArray);
    const userWordsInfo = wordsArray.reduce(
      (accum: { correctPerPage: number; wrongPerPage: number; userWordsPerPage: number }, current: IWord) => {
        if (current.userWord) {
          accum.userWordsPerPage += 1;
        }
        if (current.userWord?.optional && current.userWord?.optional.correctAnswers) {
          accum.correctPerPage += +current.userWord.optional.correctAnswers;
          accum.wrongPerPage += +current.userWord.optional.wrongAnswers;
        }
        return accum;
      },
      { correctPerPage: 0, wrongPerPage: 0, userWordsPerPage: 0 },
    );

    const pageInfo = {
      ...userWordsInfo,
      words: wordsArray,
      totalWordsInGroup: count,
    };
    return pageInfo;
  }

  createGroupInfo(arr: IWord[]) {
    let group = '-1';
    if (arr.length) {
      [{ group }] = arr;
    }
    const userWordsInfo = arr.reduce(
      (accum: { correctPerGroup: number; wrongPerGroup: number; userWordsPerGroup: number }, current: IWord) => {
        if (current.userWord) {
          accum.userWordsPerGroup += 1;
        }
        if (current.userWord?.optional && current.userWord?.optional.correctAnswers) {
          accum.correctPerGroup += +current.userWord.optional.correctAnswers;
          accum.wrongPerGroup += +current.userWord.optional.wrongAnswers;
        }
        return accum;
      },
      { correctPerGroup: 0, wrongPerGroup: 0, userWordsPerGroup: 0 },
    );
    const groupInfo = {
      ...userWordsInfo,
      currentGroup: +group,
    };
    return groupInfo;
  }

  calculateGroupInfo(payload: any, { correctPerGroup, wrongPerGroup, userWordsPerGroup }: any) {
    const {
      word: { userWord },
      filter,
      difficulty,
    } = payload;
    if (!filter && difficulty === 'deleted') {
      userWordsPerGroup -= 1;
      if (userWord.optional?.correctAnswers) {
        correctPerGroup -= +userWord.optional.correctAnswers;
        wrongPerGroup -= +userWord.optional.wrongAnswers;
      }
    } else if (!filter && difficulty === 'hard' && !userWord) {
      userWordsPerGroup += 1;
    } else if (difficulty === 'deleted' || difficulty === 'learning') {
      userWordsPerGroup -= 1;
      if (userWord.optional?.correctAnswers) {
        correctPerGroup -= +userWord.optional.correctAnswers;
        wrongPerGroup -= +userWord.optional.wrongAnswers;
      }
    }
    return { correctPerGroup, wrongPerGroup, userWordsPerGroup };
  }
}
