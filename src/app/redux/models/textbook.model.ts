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
  userWord: {
    difficulty: string;
    optional: {};
  };
}

export interface TextbookState {
  words: IWord[];
  wordSettingsTranslation: boolean;
  wordSettingsAddButtons: boolean;
  wordsHards: IWord[];
  wordsDeleted: IWord[];
  totalWordsInGroup: number;
  loading: boolean;
}

export interface TextbookUrlParams {
  group: string;
  page: string;
}
