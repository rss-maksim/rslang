import { Component } from '@angular/core';
import { ITextbookMiniGames } from 'src/app/core/models/ITextbookMiniGames';
import { mini_games_list } from './const';

@Component({
  selector: 'app-textbook-mini-games',
  templateUrl: './textbook-mini-games.component.html',
  styleUrls: ['./textbook-mini-games.component.scss'],
})
export class TextbookMiniGamesComponent {
  miniGamesList = mini_games_list;

  constructor() {}

  trackByFn(index: number, item: ITextbookMiniGames) {
    return item.name;
  }
}
