import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStatsWord } from 'src/app/redux/models/audiochallenge.state.model';
import { ASSETS_API_URL } from 'src/app/core/constants/mini-games';

@Component({
  selector: 'app-audiochallenge-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss'],
})
export class EndGameComponent {
  @Input() statsList!: IStatsWord[] | null;
  audio = new Audio();
  @Output() closeGameEvent = new EventEmitter();

  playSound(path: string) {
    this.audio.src = `${ASSETS_API_URL}/${path}?raw=true`;
    this.audio.play();
  }

  trackByIdentity = (index: number, item: any) => item;

  closeGame() {
    this.closeGameEvent.emit();
  }
}
