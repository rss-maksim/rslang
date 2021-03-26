import { Component } from '@angular/core';
import { GameCard, GAME_CARDS } from 'src/app/core/constants/mini-games';

@Component({
  selector: 'app-mini-games-page',
  templateUrl: './mini-games-page.component.html',
  styleUrls: ['./mini-games-page.component.scss'],
})
export class MiniGamesPageComponent {
  gameCards: GameCard[] = GAME_CARDS;

  trackByCardName(index: number, card: GameCard) {
    return card.name;
  }
}
