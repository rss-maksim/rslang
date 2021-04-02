import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  soundPath = '../../../../assets/sounds/mini-games/custom-mini-game/';
  isSoundOn = false;

  constructor() {}

  toggleSound(): void {
    this.isSoundOn = !this.isSoundOn;
  }

  playAudio(sound: string): void {
    let audio = new Audio();
    switch (sound) {
      case 'move': {
        audio.src = this.soundPath + 'letter_move.mp3';
        break;
      }
      case 'round lost': {
        audio.src = this.soundPath + 'round_lost.mp3';
        break;
      }
      case 'round won': {
        audio.src = this.soundPath + 'round_won.mp3';
        break;
      }
      case 'game lost': {
        audio.src = this.soundPath + 'game_lost.mp3';
        break;
      }
      case 'game won': {
        audio.src = this.soundPath + 'game_won.mp3';
        break;
      }
    }

    audio.load();
    if (this.isSoundOn) {
      audio.play();
    }
  }
}
