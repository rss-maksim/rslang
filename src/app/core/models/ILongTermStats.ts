export type Training = {
  timeStamp: number;
  wordsIds: string[];
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
