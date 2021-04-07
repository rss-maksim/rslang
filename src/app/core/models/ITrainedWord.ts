import { Answer } from 'src/app/core/models/IAnswer';

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
