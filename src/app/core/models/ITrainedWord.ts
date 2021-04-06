import { Answer } from './ISprintGame';

export interface ITrainedWord {
  id: string;
  word: string;
  translation: string;
  timeStamp: number;
  result: Answer;
  audio: string;
  userWord?: {
    difficulty?: string;
    optional?: {
      correctAnswers: string;
      wrongAnswers: string;
    };
  };
}
