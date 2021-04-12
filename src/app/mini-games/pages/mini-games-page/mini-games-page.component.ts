import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GameCard, GAME_CARDS_NEW } from 'src/app/core/constants/mini-games';

@Component({
  selector: 'app-mini-games-page',
  templateUrl: './mini-games-page.component.html',
  styleUrls: ['./mini-games-page.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({ transform: 'none' })),
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      transition('* => *', animate('400ms')),
    ]),
  ],
})
export class MiniGamesPageComponent {
  gameCards: GameCard[] = GAME_CARDS_NEW;
  flip = 'default';

  trackByCardName(index: number, card: GameCard): string {
    return card.name;
  }

  onToggleFlip() {
    this.flip = this.flip === 'default' ? 'flipped' : 'default';
    console.log(this.flip);
  }

  /*
  onFlip() {
    this.flip = 'flipped';
    console.log(this.flip);
  }

  onUnflip() {
    this.flip = 'default';
    console.log(this.flip);
  }*/
}
