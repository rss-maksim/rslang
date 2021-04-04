import { Sprinter } from '../constants/sprint-game';
import { ITrainedWord } from './ITrainedWord';
import { IWord } from './IWord';

export enum GameState {
  SETUP = 'SETUP',
  READY = 'READY',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  OVER = 'OVER',
}

export enum Sound {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
  LEVELUP = 'LEVEL-UP',
}

export enum StreakLevel {
  ZERO = 0,
  FIRST = 4,
  SECOND = 8,
  THIRD = 12,
}

export type StreakStatus = {
  firstStar: boolean;
  secondStar: boolean;
  thirdStar: boolean;
  imageSrc: Sprinter;
};

export enum KeyboardKey {
  RIGHT = 'ArrowRight',
  LEFT = 'ArrowLeft',
}

export enum Answer {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
}

export interface SprintGame {
  gameState: GameState;
  words: IWord[];
  trainedWords: ITrainedWord[];
  trainedWordsByIndexes: number[];
  maxTrainedWords: number;
  word: string;
  wordIndex: number;
  wordTranslation: string;
  isTranslationCorrect: boolean;
  streak: number;
  points: number;
  basePoints: number;
  multiplier: number;
  isMuted: boolean;
  isPaused: boolean;
}
