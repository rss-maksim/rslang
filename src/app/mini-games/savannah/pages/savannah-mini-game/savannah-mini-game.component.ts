import { IWord } from './../../../../core/models/IWord';
import { Subscription } from 'rxjs';
import { NUMBER_OF_PAGES } from './../../../../core/constants/common';
import { GameState, ISavannahGame } from './../../../../core/models/ISavannahGame';
import { MiniGamesHttpService } from './../../../../services/mini-games-http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { getRandomFrom, getRandomNumbers, getRandomsFromArray, getTranslations, shuffleArray } from '../../utils/utils';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
})
export class SavannahMiniGameComponent implements OnInit, OnDestroy {
  gameState = GameState;
  game: ISavannahGame = {
    gameState: GameState.SETTING,
    learningWords: [],
    randomTranslations: [],
    trainedWords: [],
    word: '',
    wordTranslation: '',
    answers: [],
    isAnswerCorrect: true,
    lifes: 5,
    points: 0,
    isMuted: false,
    isPaused: false,
  };
  constructor(private gamesService: MiniGamesHttpService) {}
  wordsBatch$?: Subscription;
  translationsBatch$?: Subscription;
  translationsBatch$2?: Subscription;
  translationsBatch$3?: Subscription;

  ngOnInit(): void {
    return;
  }

  ngOnDestroy(): void {
    this.wordsBatch$?.unsubscribe();
  }

  getWords(difficulty: number) {
    const [page1, page2, page3, page4] = getRandomNumbers(4);
    this.wordsBatch$ = this.gamesService.getWords(difficulty, page1).subscribe((words: IWord[]) => {
      this.game.learningWords.push(...words);
    });
    this.translationsBatch$ = this.gamesService.getWords(difficulty, page2).subscribe((words: IWord[]) => {
      this.game.randomTranslations.push(...getTranslations(words));
    });
    this.translationsBatch$2 = this.gamesService.getWords(difficulty, page3).subscribe((words: IWord[]) => {
      this.game.randomTranslations.push(...getTranslations(words));
    });
    this.translationsBatch$3 = this.gamesService.getWords(difficulty, page4).subscribe((words: IWord[]) => {
      this.game.randomTranslations.push(...getTranslations(words));
    });

    this.game.gameState = GameState.PREP;
  }

  startToPlay() {
    this.game.gameState = GameState.PLAY;
    this.nextWord();
  }

  nextWord(): void {
    if (!this.game.learningWords.length || this.game.lifes === 0) {
      this.finishGame();
    }
    const wordIndex = getRandomFrom(this.game.learningWords.length - 1);
    this.game.word = this.game.learningWords[wordIndex].word;
    this.game.wordTranslation = this.game.learningWords.splice(wordIndex, 1)[0].wordTranslate;
    this.game.answers = shuffleArray([
      ...getRandomsFromArray(this.game.randomTranslations, 3),
      this.game.wordTranslation,
    ]);
  }

  answered(isAnswerCorrect: boolean) {
    this.game.isAnswerCorrect = isAnswerCorrect;
    setTimeout(() => {
      this.nextWord();
    }, 0);
  }

  finishGame() {
    this.game.gameState = this.gameState.FINISH;
  }
}
