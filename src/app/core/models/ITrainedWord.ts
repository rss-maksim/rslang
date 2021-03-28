import { Answers } from './ISprintGame';

export interface ITrainedWord {
  id: string;
  word: string;
  translation: string;
  timeStamp: number;
  result: Answers;
}
