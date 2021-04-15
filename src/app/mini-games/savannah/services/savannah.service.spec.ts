import { IWord } from './../../../redux/models/textbook.model';
import { MiniGamesHttpService } from './../../../services/mini-games-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { GameState, ISavannahGame } from 'src/app/core/models/ISavannahGame';

import { SavannahService } from './savannah.service';

describe('SavannahService', () => {
  let service: SavannahService;
  let http: MiniGamesHttpService;
  let gameMock: ISavannahGame = {
    gameState: GameState.SETTING,
    userId: null,
    learningWords: [],
    totalWordsAmount: 0,
    randomTranslations: [],
    trainedWords: [],
    id: '',
    word: '',
    audio: '',
    wordTranslation: '',
    answers: [],
    isAnswerCorrect: true,
    lifes: 5,
    progress: 0,
    points: 0,
    isPaused: false,
    queryParams: {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MiniGamesHttpService],
    });
    service = TestBed.inject(SavannahService);
    http = TestBed.inject(MiniGamesHttpService);
    service.game = gameMock;
    const response: IWord[] = [];
    spyOn(http, 'getWords').and.returnValue(of(response));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('set functions should set values properly, subscription should unsubscribe on destroy', () => {
    service.setGameState(GameState.PLAY);
    expect(gameMock.gameState).toEqual(GameState.PLAY);
    service.setPause(true);
    expect(gameMock.isPaused).toEqual(true);
    service.finishGame();
    expect(gameMock.gameState).toEqual(GameState.FINISH);
  });

  it('starting game should change game state', () => {
    service.getWords(1);
    expect(gameMock.gameState).toEqual(GameState.PREP);
  });

  it('should unsubscribe on onDestroy', () => {
    spyOn(Subscription.prototype, 'unsubscribe');
    service.getWords(1);
    service.ngOnDestroy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();
  });
});
