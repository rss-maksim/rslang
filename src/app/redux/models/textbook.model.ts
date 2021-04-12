export interface IWord {
  id: string;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  difficulty?: string;
  group: string;
  page: string;
  userWord?: {
    difficulty?: string;
    optional?: {
      correctAnswers: string;
      wrongAnswers: string;
    };
  };
}

export interface TextbookState {
  words: IWord[];
  wordSettingsTranslation: boolean;
  wordSettingsAddButtons: boolean;
  wordsHards: IWord[];
  wordsDeleted: IWord[];
  currentGroup: number;
  totalWordsInGroup: number;
  loading: boolean;
  userWordsPerPage: number;
  correctPerPage: number;
  wrongPerPage: number;
  userWordsPerGroup: number;
  correctPerGroup: number;
  wrongPerGroup: number;
  currentFilter: string;
}

export interface TextbookUrlParams {
  group: string;
  page: string;
}

export interface TextbookPageInfo {
  words: IWord[];
  totalWordsInGroup: number;
  userWordsInGroup?: number;
  userWordsPerPage?: number;
  correctPerPage?: number;
  wrongPerPage?: number;
}
