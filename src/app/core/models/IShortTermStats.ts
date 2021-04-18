import { Games } from '../constants/mini-games';
import { ITrainedWord } from './ITrainedWord';

export interface IShortTermStats {
  trainedWords: ITrainedWord[];
  gamePlayed: Games;
  timeStamp: number;
}

export interface IShortTermStatsResults {
  gameName: Games | 'Общая Статистика';
  learnedWordsByIds: Set<string>;
  trainedWords: number;
  correctAnswers: number;
  streak: number;
}
