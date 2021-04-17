import { TestBed } from '@angular/core/testing';

import { MiniGamesSettingsService } from './mini-games-settings.service';

describe('MiniGamesSettingsService', () => {
  let service: MiniGamesSettingsService;
  let settingsMock = { isMuted: false };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniGamesSettingsService);
    service.settings = settingsMock;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('changeMutedState function should change muted state', () => {
    const boolean = service.getMutedState();
    service.changeMutedState();
    expect(settingsMock.isMuted).toBe(!boolean);
    expect(service.changeMutedState()).toBe(boolean);
  });
});
