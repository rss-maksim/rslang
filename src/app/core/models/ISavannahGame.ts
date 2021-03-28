import { ITrainedWord } from './ITrainedWord';
import { IWord } from './IWord';

export enum GameState {
  SETTING = 'SETTING',
  PREP = 'PREP',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
}

export enum Answer {
  RIGHT = 'RIGHT',
  WRONG = 'WRONG',
}

export interface ISavannahGame {
  gameState: GameState;
  words: IWord[];
  trainedWords: ITrainedWord[];
  trainedWordsByIndexes: number[];
  word: string;
  wordIndex: number;
  wordTranslation: string;
  isTranslationCorrect: boolean;
  lifes: number;
  points: number;
  isMuted: boolean;
  isPaused: boolean;
}
