import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Games } from 'src/app/core/constants/mini-games';
import { Answer } from 'src/app/core/models/IAnswer';
import { ILongTermStats, ILongTermStatsByGroups, Training } from 'src/app/core/models/ILongTermStats';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LongTermStatisticsService {
  constructor(private statisticsService: StatisticsService, private userService: UserService) {}

  getStatistics(): Observable<ILongTermStats> | null {
    const userId = this.userService.getUserId();
    return userId ? this.statisticsService.getUserStatistics(userId) : null;
  }

  getStatisticsByGroups(): Observable<ILongTermStatsByGroups> | null {
    const statistics = this.getStatistics();

    if (statistics) {
      return statistics.pipe(
        map((stats) => {
          return this.calculateStatisticsByGroups(stats);
        }),
      );
    } else {
      return null;
    }
  }

  private calculateStatisticsByGroups(stats: ILongTermStats): ILongTermStatsByGroups {
    const trainings = stats?.optional?.statistics?.trainings;
    const results: ILongTermStatsByGroups = {};

    trainings.forEach((training) => {
      const wordsGroup = training.wordsGroup;
      if (!results[wordsGroup]) {
        results[wordsGroup] = {
          learnedWords: new Set(),
          correctAnswers: 0,
          wrongAnswers: 0,
        };
      }
      results[wordsGroup].learnedWords = new Set([...results[wordsGroup].learnedWords, ...training.wordsIds]);
      results[wordsGroup].correctAnswers += (training.answers || []).filter(
        (answer) => answer === Answer.CORRECT,
      ).length;
      results[wordsGroup].wrongAnswers += (training.answers || []).filter((answer) => answer === Answer.WRONG).length;
    });

    return results;
  }

  setStatistics(trainedWords: ITrainedWord[], gamePlayed: Games, wordsGroup: string): void {
    const userId = this.userService.getUserId();
    if (!userId) {
      return;
    }

    const userStatistics$ = this.getStatistics();
    if (!userStatistics$) {
      return;
    }

    const statisticsSubscription: Subscription = userStatistics$.subscribe((prevStatistics) => {
      delete prevStatistics?.id;
      console.log(prevStatistics);
      const statisticsToSend = this.addStatistics(prevStatistics, trainedWords, wordsGroup);
      const statisticsUpdateSubscription: Subscription = this.statisticsService
        .updateUserStatistics(userId, statisticsToSend)
        .subscribe(() => {
          statisticsUpdateSubscription.unsubscribe();
        });
      statisticsSubscription.unsubscribe();
    });
  }

  private addStatistics(prevStats: ILongTermStats, trainedWords: ITrainedWord[], wordsGroup: string): ILongTermStats {
    let updatedStatistics = prevStats;
    if (updatedStatistics?.optional?.statistics?.trainings?.length) {
      updatedStatistics.optional.statistics.trainings.push({
        timeStamp: Date.now(),
        wordsIds: trainedWords.map((word) => word.id),
        answers: trainedWords.map((word) => word.result),
        wordsGroup,
      });
      updatedStatistics.learnedWords = this.countLearnedWords(updatedStatistics.optional.statistics.trainings);
    } else {
      updatedStatistics = {
        learnedWords: trainedWords.length,
        optional: {
          statistics: {
            trainings: [
              {
                timeStamp: Date.now(),
                wordsIds: trainedWords.map((word) => word.id),
                answers: trainedWords.map((word) => word.result),
                wordsGroup,
              },
            ],
          },
        },
      };
    }
    return updatedStatistics;
  }

  private countLearnedWords(trainings: Training[]) {
    let learnedWordsByIds = new Set();
    trainings.forEach((training) => {
      learnedWordsByIds = new Set([...learnedWordsByIds, ...training.wordsIds]);
    });
    return learnedWordsByIds.size;
  }
}
