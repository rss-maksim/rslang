import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EndGameComponent } from './end-game.component';
import { Answer } from 'src/app/core/models/IAnswer';

describe('EndGameComponent', () => {
  let component: EndGameComponent;
  let fixture: ComponentFixture<EndGameComponent>;
  let mockWord: ITrainedWord = {
    id: '1',
    word: 'word',
    translation: 'слово',
    timeStamp: Date.now(),
    result: Answer.CORRECT,
    audio: '../../../../../assets/sounds/mini-games/success.mp3',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndGameComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeEvent on close button', () => {
    spyOn(component.closeGameEvent, 'emit');
    component.closeGame();
    expect(component.closeGameEvent.emit).toHaveBeenCalled();
  });

  it('expected to put correctly answered word to right answers', () => {
    component.trainedWords = [mockWord];
    component.ngOnInit();
    expect(component.rightWords).toContain(mockWord);
  });
});
