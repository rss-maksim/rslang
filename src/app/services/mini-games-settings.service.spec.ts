import { TestBed } from '@angular/core/testing';

import { MiniGamesSettingsService } from './mini-games-settings.service';

describe('MiniGamesSettingsService', () => {
  let service: MiniGamesSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniGamesSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
