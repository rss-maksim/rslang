import { IAudiochallengeWord } from 'src/app/redux/models/audiochallenge.state.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiochallengeWordCardComponent } from './word-card.component';

describe('AudiochallengeWordCardComponent', () => {
  let component: AudiochallengeWordCardComponent;
  let fixture: ComponentFixture<AudiochallengeWordCardComponent>;
  let mockWord: IAudiochallengeWord = {
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
      declarations: [AudiochallengeWordCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiochallengeWordCardComponent);
    component = fixture.componentInstance;
    component.word = mockWord;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
