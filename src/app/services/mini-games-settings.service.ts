import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
export interface ISettings {
  isMuted: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class MiniGamesSettingsService {
  settings: ISettings = { isMuted: false };
  gameSettings = new Observable<ISettings>((observer) => {
    this.getMutedState();
    observer.next(this.settings);
  });
  constructor() {}

  getMutedState(): boolean {
    if (localStorage.getItem('isMuted')) {
      this.settings.isMuted = JSON.parse(localStorage.getItem('isMuted') || '');
      return this.settings.isMuted;
    } else {
      localStorage.setItem('isMuted', JSON.stringify(this.settings.isMuted));
      return this.settings.isMuted;
    }
  }

  changeMutedState(): boolean {
    try {
      this.settings.isMuted = !JSON.parse(localStorage.getItem('isMuted') || '');
      localStorage.setItem('isMuted', JSON.stringify(this.settings.isMuted));
      return this.settings.isMuted;
    } catch {
      return this.settings.isMuted;
    }
  }
}
