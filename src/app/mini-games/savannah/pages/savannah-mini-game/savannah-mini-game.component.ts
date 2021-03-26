import { Animations } from './../../animations';
import { MiniGamesHttpService } from './../../../../services/mini-games-http.service';
import { Component, OnInit } from '@angular/core';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
  animations: [Animations.wordSlide],
})
export class SavannahMiniGameComponent implements OnInit {
  wordState = '';
  constructor(private service: MiniGamesHttpService) {}
  words: any;
  ngOnInit(): void {
    const words$ = this.service.getWords().subscribe((data: any) => (this.words = [...data]));
    return;
  }
  onAnimationEvent(event: any) {
    console.log(event);
  }
  wordClicked(word: Word) {
    this.wordState = this.wordState === 'right' ? 'right' : 'right';
  }
}
