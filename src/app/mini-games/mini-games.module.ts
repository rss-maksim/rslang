import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SprintMiniGameComponent } from './sprint/sprint-mini-game.component';
import { MiniGamesRoutingModule } from './mini-games-routing.module';
import { MaterialModule } from '../material/material.module';
import { FullScreenButtonComponent } from './shared/components/full-screen-button/full-screen-button.component';
import { MiniGamesPageComponent } from './pages/mini-games-page/mini-games-page.component';
import { MainActionsComponent } from './savannah/components/main-actions/main-actions.component';
import { OptionsInputComponent } from './savannah/components/options-input/options-input.component';
import { SlidingWordComponent } from './savannah/components/sliding-word/sliding-word.component';
import { SavannahMiniGameComponent } from './savannah/pages/savannah-mini-game/savannah-mini-game.component';
import { AudiochallengeMainComponent } from './audiochallenge/components/audiochallenge-main/audiochallenge-main.component';
import { AudiochallengeGameComponent } from './audiochallenge/components/audiochallenge-game/audiochallenge-game.component';
import { DecisionButtonsComponent } from './audiochallenge/components/decision-buttons/decision-buttons.component';
import { AudiochallengeWordCardComponent } from './audiochallenge/components/word-card/word-card.component';
import { TranslationOptionsComponent } from './audiochallenge/components/translation-options/translation-options.component';
import { CounterComponent } from './shared/components/counter/counter.component';
import { SprintGameCardComponent } from './sprint/components/sprint-game-card/sprint-game-card.component';
import { SprintGameStartComponent } from './sprint/components/sprint-game-start/sprint-game-start.component';
import { SprintGameEndComponent } from './sprint/components/sprint-game-end/sprint-game-end.component';
import { SprintGamePauseExitComponent } from './sprint/components/sprint-game-pause-exit/sprint-game-pause-exit.component';
import { LifesComponent } from './savannah/components/lifes/lifes.component';
import { DifficultyyInputComponent } from './savannah/components/difficultyy-input/difficultyy-input.component';
import { EndGameComponent } from './audiochallenge/components/end-game/end-game.component';
import { GameSoundsButtonComponent } from './audiochallenge/components/game-sounds-button/game-sounds-button.component';
import { AudiochallengeEffects } from '../redux/effects/audiochallenge.effects';
import audiochallengeReducer from '../redux/reducers/audiochallengeReducer';
import { LevelChoiseComponent } from './audiochallenge/components/level-choise/level-choise.component';

@NgModule({
  declarations: [
    SprintMiniGameComponent,
    SavannahMiniGameComponent,
    MiniGamesPageComponent,
    OptionsInputComponent,
    SlidingWordComponent,
    MainActionsComponent,
    FullScreenButtonComponent,
    FullScreenButtonComponent,
    AudiochallengeMainComponent,
    AudiochallengeGameComponent,
    DecisionButtonsComponent,
    AudiochallengeWordCardComponent,
    TranslationOptionsComponent,
    CounterComponent,
    SprintGameCardComponent,
    SprintGameStartComponent,
    SprintGameEndComponent,
    SprintGamePauseExitComponent,
    LifesComponent,
    DifficultyyInputComponent,
    EndGameComponent,
    GameSoundsButtonComponent,
    LevelChoiseComponent,
  ],
  imports: [
    CommonModule,
    MiniGamesRoutingModule,
    MaterialModule,
    StoreModule.forFeature('audiochallenge', audiochallengeReducer),
    EffectsModule.forFeature([AudiochallengeEffects]),
  ],
})
export class MiniGamesModule {}
