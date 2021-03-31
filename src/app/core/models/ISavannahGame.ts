import { ITrainedWord } from './ITrainedWord';
import { IWord } from './IWord';

export enum GameState {
  SETTING = 'SETTING',
  PREP = 'PREP',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  FINISH = 'FINISH',
}

export enum Answer {
  RIGHT = 'RIGHT',
  WRONG = 'WRONG',
}

export interface ISavannahGame {
  gameState: GameState;
  learningWords: IWord[];
  randomTranslations: string[];
  trainedWords: ITrainedWord[];
  word: string;
  wordTranslation: string;
  answers: string[];
  isAnswerCorrect: boolean;
  lifes: number;
  points: number;
  isMuted: boolean;
  isPaused: boolean;
}
