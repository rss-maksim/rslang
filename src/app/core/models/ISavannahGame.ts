import { AggregatedWordsRequestParams } from './word.model';
import { ITrainedWord } from './ITrainedWord';
import { IWord } from './IWord';

export enum GameState {
  SETTING,
  PREP,
  PLAY,
  PAUSE,
  FINISH,
}

export enum Answer {
  CORRECT,
  WRONG,
}

export interface ISavannahGame {
  gameState: GameState;
  userId: string | null;
  learningWords: IWord[];
  totalWordsAmount: number;
  randomTranslations: string[];
  trainedWords: ITrainedWord[];
  id: string;
  word: string;
  audio: string;
  wordTranslation: string;
  answers: string[];
  isAnswerCorrect: boolean;
  lifes: number;
  progress: number;
  points: number;
  isMuted: boolean;
  isPaused: boolean;
  queryParams: AggregatedWordsRequestParams;
}
