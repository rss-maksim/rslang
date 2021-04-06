import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/core/models/IAnswer';

import { IShortTermStats, IShortTermStatsResults } from 'src/app/core/models/IShortTermStats';

@Component({
  selector: 'app-short-term-statistics',
  templateUrl: './short-term-statistics.component.html',
  styleUrls: ['./short-term-statistics.component.scss'],
})
export class ShortTermStatisticsComponent implements OnInit {
  @Input() shortTermStats: IShortTermStats[] | null = null;
  stats: IShortTermStatsResults[] = [];

  ngOnInit(): void {
    this.stats = this.calculateStatistics(this.shortTermStats);
  }

  private calculateStatistics(stats: IShortTermStats[] | null): IShortTermStatsResults[] {
    const statsResults: IShortTermStatsResults[] = [];

    if (!this.shortTermStats) {
      return statsResults;
    }

    this.shortTermStats.forEach((stats) => {
      const game = stats.gamePlayed;
      const trainedWords = stats.trainedWords.length;
      const learnedWordsByIds = new Set(stats.trainedWords.map((word) => word.id));
      const correctAnswers = this.countCorrectAnswers(stats);
      const streak = this.countStreak(stats);
      const gameIndex = statsResults.findIndex((statResults) => {
        return statResults.gameName === game;
      });

      if (gameIndex !== -1) {
        statsResults[gameIndex].trainedWords += trainedWords;
        statsResults[gameIndex].learnedWordsByIds = new Set([
          ...learnedWordsByIds,
          ...statsResults[gameIndex].learnedWordsByIds,
        ]);
        statsResults[gameIndex].correctAnswers += correctAnswers;
        statsResults[gameIndex].streak =
          statsResults[gameIndex].streak < streak ? streak : statsResults[gameIndex].streak;
      } else {
        statsResults.push({
          gameName: game,
          trainedWords,
          learnedWordsByIds,
          correctAnswers,
          streak,
        });
      }
    });

    const totalStats = this.calculateTotalStats(statsResults);
    statsResults.push(totalStats);

    return statsResults.reverse();
  }

  private countCorrectAnswers(stats: IShortTermStats): number {
    return stats.trainedWords.filter((word) => {
      return word.result === Answer.CORRECT;
    }).length;
  }

  private countStreak(stats: IShortTermStats): number {
    let streak = 0;
    let maxStreak = 0;

    stats.trainedWords.forEach((word) => {
      if (word.result === Answer.CORRECT) {
        streak += 1;
      } else {
        maxStreak = maxStreak > streak ? maxStreak : streak;
        streak = 0;
      }
    });
    return maxStreak;
  }

  private calculateTotalStats(gameStats: IShortTermStatsResults[]): IShortTermStatsResults {
    const totalResults: IShortTermStatsResults = {
      gameName: 'Общая Статистика',
      trainedWords: gameStats.reduce((acc, gameStat) => {
        return acc + gameStat.trainedWords;
      }, 0),
      learnedWordsByIds: gameStats.reduce((acc, gameStat) => {
        return new Set([...acc, ...gameStat.learnedWordsByIds]);
      }, new Set<string>()),
      correctAnswers: gameStats.reduce((acc, gameStat) => {
        return acc + gameStat.correctAnswers;
      }, 0),
      streak: gameStats.reduce((result, gameStat) => {
        return result > gameStat.streak ? result : gameStat.streak;
      }, 0),
    };

    return totalResults;
  }
}
