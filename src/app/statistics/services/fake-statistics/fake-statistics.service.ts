import { Injectable } from '@angular/core';

import { Label } from 'ng2-charts';

@Injectable({
  providedIn: 'root',
})
export class FakeStatisticsService {
  generateLongTermStats(quantity?: number): [Label[], number[], number[]] {
    const [labels, learnedWords, learnedWordsCumulative] = this.generateFakeLearnedWords(quantity);

    return [labels, learnedWords, learnedWordsCumulative];
  }

  private generateFakeLearnedWords(
    quantity: number = 50,
    maxWordsLearnedByDay: number = 50,
  ): [Label[], number[], number[]] {
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;

    const fakeLearnedWords: number[] = Array.from(Array(quantity), () => {
      return Math.floor(Math.random() * maxWordsLearnedByDay);
    });

    const fakeDates: Label[] = Array.from(Array(quantity), (_, idx) => {
      return new Date(Date.now() - (quantity - idx) * millisecondsInOneDay).toLocaleString('ru', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      });
    });

    const fakeCumulativeLearnedWords: number[] = [];
    let learnedWords = 0;
    fakeLearnedWords.forEach((wordsCount) => {
      learnedWords += wordsCount;
      fakeCumulativeLearnedWords.push(learnedWords);
    });
    return [fakeDates, fakeLearnedWords, fakeCumulativeLearnedWords];
  }
}
