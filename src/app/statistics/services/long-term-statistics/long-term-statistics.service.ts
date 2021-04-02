import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Games } from 'src/app/core/constants/mini-games';
import { ILongTermStats, Training } from 'src/app/core/models/ILongTermStats';
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
    if (userId) {
      const userStatistics$ = this.statisticsService.getUserStatistics(userId);
      return userStatistics$;
    } else {
      return null;
    }
  }

  setStatistics(trainedWords: ITrainedWord[], gamePlayed: Games): void {
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
      const statisticsToSend = this.addStatistics(prevStatistics, trainedWords);
      const statisticsUpdateSubscription: Subscription = this.statisticsService
        .updateUserStatistics(userId, statisticsToSend)
        .subscribe(() => {
          statisticsUpdateSubscription.unsubscribe();
        });
      statisticsSubscription.unsubscribe();
    });
  }

  private addStatistics(prevStats: ILongTermStats, trainedWords: ITrainedWord[]): ILongTermStats {
    let updatedStatistics = prevStats;
    if (updatedStatistics?.optional?.statistics?.trainings?.length) {
      updatedStatistics.optional.statistics.trainings.push({
        timeStamp: Date.now(),
        wordsIds: trainedWords.map((word) => word.id),
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
