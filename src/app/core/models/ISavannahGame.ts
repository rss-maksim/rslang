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
  totalWordsAmount: number;
  randomTranslations: string[];
  trainedWords: ITrainedWord[];
  id: string;
  word: string;
  wordTranslation: string;
  answers: string[];
  isAnswerCorrect: boolean;
  lifes: number;
  progress: number;
  points: number;
  isMuted: boolean;
  isPaused: boolean;
}
