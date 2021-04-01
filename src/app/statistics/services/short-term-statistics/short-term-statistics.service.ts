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
    const stats: IShortTermStats[] | null = this.storageService.getItem(LOCAL_STORAGE_STATS_KEY);
    return stats;
  }

  setStatistics(trainedWords: ITrainedWord[], gamePlayed: Games) {
    console.log(trainedWords, gamePlayed);
    let stats = this.getStatistics();
    if (!stats) {
      stats = [];
    }

    // Store only statistics for one day
    const today = new Date();
    stats = stats.filter((stat) => {
      const date = new Date(stat.timeStamp);
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });

    stats.push({
      trainedWords,
      gamePlayed,
      timeStamp: Date.now(),
    });

    this.storageService.setItem(LOCAL_STORAGE_STATS_KEY, stats);
  }
}
