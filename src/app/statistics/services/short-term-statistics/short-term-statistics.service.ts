import { Injectable } from '@angular/core';

import { Games } from 'src/app/core/constants/mini-games';
import { LOCAL_STORAGE_STATS_KEY } from 'src/app/core/constants/statistics';
import { IShortTermStats } from 'src/app/core/models/IShortTermStats';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShortTermStatisticsService {
  constructor(private storageService: StorageService) {}

  getStatistics(): IShortTermStats[] | null {
    let stats: IShortTermStats[] | null = this.storageService.getItem(LOCAL_STORAGE_STATS_KEY);

    if (stats) {
      // store statistics only for one day
      const today = new Date();
      stats = stats.filter((stat) => {
        const date = new Date(stat.timeStamp);
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      });

      // store statistics only with trained words
      stats = stats.filter((stat) => {
        return stat.trainedWords.length > 0;
      });

      if (stats.length > 0) {
        this.storageService.setItem(LOCAL_STORAGE_STATS_KEY, stats);
      } else {
        this.storageService.removeItem(LOCAL_STORAGE_STATS_KEY);
        stats = null;
      }
    }

    return stats;
  }

  setStatistics(trainedWords: ITrainedWord[], gamePlayed: Games): void {
    let stats = this.getStatistics();
    if (!stats) {
      stats = [];
    }

    stats.push({
      trainedWords,
      gamePlayed,
      timeStamp: Date.now(),
    });

    this.storageService.setItem(LOCAL_STORAGE_STATS_KEY, stats);
  }
}
