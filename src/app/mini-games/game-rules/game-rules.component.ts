import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameCard, GAME_CARDS_NEW } from 'src/app/core/constants/mini-games';

@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss'],
})
export class GameRulesComponent {
  @Output() hidden = new EventEmitter();
  @Input() isShow!: boolean;
  @Input() text!: string | undefined;
  gameCards: GameCard[] = GAME_CARDS_NEW;

  trackByCardName(index: number, card: GameCard): string {
    return card.name;
  }

  constructor() {}

  onHiddenPopup() {
    this.hidden.emit();
  }
}
