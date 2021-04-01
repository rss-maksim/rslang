import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  isSoundOn = false;

  constructor() {}

  toggleSound(): void {
    this.isSoundOn = !this.isSoundOn;
  }

  playAudio(sound: string): void {
    let audio = new Audio();
    if (sound === 'move') {
      audio.src = '../../../../assets/sounds/mini-games/custom-mini-game/letter_move.mp3';
    } else if (sound === 'round lost') {
      audio.src = '../../../../assets/sounds/mini-games/custom-mini-game/round_lost.mp3';
    } else if (sound === 'round won') {
      audio.src = '../../../../assets/sounds/mini-games/custom-mini-game/round_won.mp3';
    } else if (sound === 'game lost') {
      audio.src = '../../../../assets/sounds/mini-games/custom-mini-game/game_lost.mp3';
    } else if (sound === 'game won') {
      audio.src = '../../../../assets/sounds/mini-games/custom-mini-game/game_won.mp3';
    }
    audio.load();
    if (this.isSoundOn) {
      audio.play();
    }
  }
}
