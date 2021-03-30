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
}

export interface TextbookState {
  words: IWord[];
  wordSettingsTranslation: boolean;
  wordSettingsAddButtons: boolean;
}

export interface TextbookUrlParams {
  group: string;
  page: string;
}
