import { Answer } from './IAnswer';

export type Training = {
  timeStamp: number;
  wordsIds: string[];
  answers: Answer[];
  wordsGroup: string;
};

export interface ILongTermStats {
  id?: string;
  learnedWords: number;
  optional: {
    statistics: {
      trainings: Array<Training>;
    };
  };
}

export interface ILongTermStatsByGroups {
  [wordGroup: string]: {
    learnedWords: Set<string>;
    correctAnswers: number;
    wrongAnswers: number;
  };
}
