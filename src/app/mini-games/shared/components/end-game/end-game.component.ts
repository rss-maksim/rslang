import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ASSETS_API_URL } from 'src/app/core/constants/mini-games';
import { ITrainedWord } from 'src/app/core/models/ITrainedWord';
import { Answer } from 'src/app/core/models/ISprintGame';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss'],
})
export class EndGameComponent {
  @Input() trainedWords!: ITrainedWord[] | null;
  @Input() gamePoints!: number | null;
  audio = new Audio();
  answer = Answer;
  rightWords: ITrainedWord[] = [];
  wrongWords: ITrainedWord[] = [];
  @Output() closeGameEvent = new EventEmitter();

  playSound(path: string) {
    this.audio.src = `${ASSETS_API_URL}/${path}`;
    this.audio.play();
  }

  trackByIdentity = (index: number, item: any) => item;

  closeGame() {
    this.closeGameEvent.emit();
  }
}
