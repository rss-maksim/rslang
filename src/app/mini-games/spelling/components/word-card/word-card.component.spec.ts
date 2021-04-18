import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISpellingWord } from 'src/app/redux/models/spelling.state.model';
import { SpellingWordCardComponent } from './word-card.component';

describe('SpellingWordCardComponent', () => {
  let component: SpellingWordCardComponent;
  let fixture: ComponentFixture<SpellingWordCardComponent>;
  let mockWord: ISpellingWord = {
    audio: '',
    audioExample: '',
    audioMeaning: '',
    id: '',
    image: 'image',
    textExample: '',
    textExampleTranslate: '',
    textMeaning: '',
    textMeaningTranslate: '',
    transcription: '',
    word: '',
    wordTranslate: '',
    translationsArray: [],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpellingWordCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellingWordCardComponent);
    component = fixture.componentInstance;
    component.word = mockWord;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
