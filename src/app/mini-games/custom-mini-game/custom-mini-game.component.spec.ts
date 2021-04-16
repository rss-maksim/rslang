import { MiniGamesSettingsService } from './../../services/mini-games-settings.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMiniGameComponent } from './custom-mini-game.component';
import { IWord } from 'src/app/core/models/IWord';
import { MiniGamesHttpService } from 'src/app/services/mini-games-http.service';
import { of, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

describe('CustomMiniGameComponent', () => {
  let component: CustomMiniGameComponent;
  let fixture: ComponentFixture<CustomMiniGameComponent>;
  let sourceArrayMock: IWord[] = [];
  let settingsMock: MiniGamesSettingsService;
  let httpMock: MiniGamesHttpService;
  let userServiceMock: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomMiniGameComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: MatDialog, useValue: {} }, MiniGamesSettingsService],
    }).compileComponents();
    settingsMock = TestBed.inject(MiniGamesSettingsService);

    httpMock = TestBed.inject(MiniGamesHttpService);
    const response: IWord[] = [];
    spyOn(httpMock, 'getWords').and.returnValue(of(response));

    userServiceMock = TestBed.inject(UserService);
    spyOn(userServiceMock, 'getUserId').and.returnValue('123');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMiniGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set functions should set proper values', () => {
    spyOn(settingsMock, 'changeMutedState');
    component.onToggleSound();
    expect(settingsMock.changeMutedState).toHaveBeenCalled();

    component.onSetDifficultyLevel(4);
    expect(component.difficultyLevel).toEqual(4);

    component.onSetNumberOfRounds(5);
    expect(component.numberOfGameRounds).toEqual(5);

    component.onSetRoundLength(20);
    expect(component.roundLength).toEqual(20);

    component.onStartGameDialog();
    expect(component.isGameStarted).toEqual(false);
  });

  it('onGetWords function should also get userId and unsubscribe from previous words subscription', () => {
    spyOn(Subscription.prototype, 'unsubscribe');
    component.onGetWords();
    expect(component.userId).toEqual('123');
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();
  });

  it('isGameLost function should word properly', () => {
    component.errorsCounter = 4;
    expect(component.isGameLost()).toEqual(false);

    component.errorsCounter = 5;
    expect(component.isGameLost()).toEqual(true);
  });

  it('addLeadingZero should move one digit numbers into two digits', () => {
    expect(component.addLeadingZero(8)).toEqual('08');
    expect(component.addLeadingZero(10)).toEqual('10');
  });

  it('resetGame function should reset game values and call getWords function', () => {
    component.spinnerValue = 22;
    spyOn(component, 'onGetWords');
    component.resetGame();
    expect(component.spinnerValue).toEqual(100);
    expect(component.onGetWords).toHaveBeenCalled();
  });

  it('onStartGame should set proper game values and call reseting function', () => {
    component.isGameStarted = false;
    spyOn(component, 'resetGame');
    component.onStartGame();
    expect(component.resetGame).toHaveBeenCalled();
    expect(component.isGameStarted).toEqual(true);
  });

  it('isLastRound check should return proper boolean value', () => {
    component.currentWordIndex = 19;
    component.numberOfGameRounds = 20;
    expect(component.isLastRound()).toEqual(true);

    component.numberOfGameRounds = 30;
    expect(component.isLastRound()).toEqual(false);
  });

  it('startNextRound function should reset after all manipulations', () => {
    spyOn(component, 'nextRoundReset');
    component.startNextRound();
    expect(component.nextRoundReset).toHaveBeenCalled();
  });
});
