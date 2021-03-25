import { MiniGamesHttpService } from './../../../../services/mini-games-http.service';
import { animate, sequence, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Word } from '../../models/word.model';
import { flash } from 'ng-animate';

@Component({
  selector: 'app-savannah-mini-game',
  templateUrl: './savannah-mini-game.component.html',
  styleUrls: ['./savannah-mini-game.component.scss'],
  animations: [
    trigger('word-slide', [
      state('right', style({})),
      state('wrong', style({})),
      transition('* => right', [
        style({ position: 'absolute' }),
        sequence([animate(300, style({ width: '1px', overflow: 'scroll' })), animate(500, style({ bottom: 0 }))]),
      ]),
      transition('* => wrong', [useAnimation(flash)]),
      transition(':enter', [
        style({ opacity: 0 }),
        sequence([
          animate(200, style({ opacity: 1 })),
          animate(2800, style({ bottom: 0 })),
          animate(200, style({ opacity: 0 })),
        ]),
      ]),
    ]),
  ],
})
export class SavannahMiniGameComponent implements OnInit {
  wordState = '';
  visible = true;
  constructor(private service: MiniGamesHttpService) {}
  words: any;
  ngOnInit(): void {
    const words$ = this.service.getWords().subscribe((data: any) => (this.words = [...data]));
    return;
  }

  wordClicked(word: Word) {
    this.visible = this.visible;
    this.wordState = this.wordState === 'right' ? 'right' : 'right';
  }
}
