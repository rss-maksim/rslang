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
  // wordsGroup: string;
  // wordsPage: string;
  // @todo: might consider to create property settings
  // settings: {
  //   wordSettingsTranslation: boolean;
  //   wordSettingsAddButtons: boolean;
  // }
  wordSettingsTranslation: boolean;
  wordSettingsAddButtons: boolean;
}

export interface TextbookUrlParams {
  group: string;
  page: string;
}
