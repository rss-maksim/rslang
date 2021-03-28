import { GameState, ISavannahGame } from './../../../../core/models/ISavannahGame';
import { MiniGamesHttpService } from './../../../../services/mini-games-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
})
export class SavannahMiniGameComponent implements OnInit {
  game: ISavannahGame = {
    gameState: GameState.PREP,
    words: [],
    trainedWords: [],
    trainedWordsByIndexes: [],
    word: '',
    wordIndex: 0,
    wordTranslation: '',
    isTranslationCorrect: true,
    lifes: 3,
    points: 0,
    isMuted: false,
    isPaused: false,
  };
  constructor(private service: MiniGamesHttpService) {}
  words: any;

  ngOnInit(): void {
    const words$ = this.service.getWords().subscribe((data: any) => (this.words = [...data.splice(-4)]));
    return;
  }

  getWords() {}

  startToPlay() {
    this.game.gameState = GameState.PLAY;
  }

  nextWord() {}

  finishGame() {}
}
