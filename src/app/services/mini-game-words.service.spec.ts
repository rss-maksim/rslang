import { TestBed } from '@angular/core/testing';

import { MiniGamesHttpService } from './mini-games-http.service';

describe('MiniGamesHttpService', () => {
  let service: MiniGamesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniGamesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
