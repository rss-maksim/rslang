export interface IWord {
  _id?: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group?: string;
  id: string;
  image: string;
  page?: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  wordsPerExampleSentence?: number;
  userWord?: {};
}
