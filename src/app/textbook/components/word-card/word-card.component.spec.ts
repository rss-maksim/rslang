import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { WordCardComponent } from './word-card.component';

describe('WordCardComponent', () => {
  let component: WordCardComponent;
  let fixture: ComponentFixture<WordCardComponent>;
  let store: MockStore;
  let initialState = { textbook: { wordSettingsTranslation: true } };
  let mockWord: any = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordCardComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCardComponent);
    component = fixture.componentInstance;
    component.item = mockWord;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
