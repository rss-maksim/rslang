import { LifesComponent } from './savannah/components/lifes/lifes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
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
import { StartGameComponent } from './shared/components/start-game/start-game.component';
import { GameSoundsButtonComponent } from './audiochallenge/components/game-sounds-button/game-sounds-button.component';
import { AudiochallengeEffects } from '../redux/effects/audiochallenge.effects';
import audiochallengeReducer from '../redux/reducers/audiochallengeReducer';
import { LevelChoiseComponent } from './audiochallenge/components/level-choise/level-choise.component';
import { CloseGameDialogComponent } from './shared/components/close-game-dialog/close-game-dialog.component';
import { EndGameComponent } from './shared/components/end-game/end-game.component';
import { CustomMiniGameComponent } from './custom-mini-game/custom-mini-game.component';
import { SpellingMainComponent } from './spelling/components/spelling-main/spelling-main.component';
import { SpellingGameComponent } from './spelling/components/spelling-game/spelling-game.component';
import { SpellingDecisionButtonsComponent } from './spelling/components/decision-buttons/decision-buttons.component';
import { SpellingWordComponent } from './spelling/components/spelling-word/spelling-word.component';
import { SpellingWordCardComponent } from './spelling/components/word-card/word-card.component';
import { SpellingGameSoundsButtonComponent } from './spelling/components/game-sounds-button/game-sounds-button.component';
import { GameRulesComponent } from './game-rules/game-rules.component';

@NgModule({
  declarations: [
    SprintMiniGameComponent,
    SavannahMiniGameComponent,
    MiniGamesPageComponent,
    OptionsInputComponent,
    SlidingWordComponent,
    MainActionsComponent,
    FullScreenButtonComponent,
    LifesComponent,
    AudiochallengeMainComponent,
    AudiochallengeGameComponent,
    DecisionButtonsComponent,
    AudiochallengeWordCardComponent,
    TranslationOptionsComponent,
    CounterComponent,
    SprintGameCardComponent,
    StartGameComponent,
    GameSoundsButtonComponent,
    LevelChoiseComponent,
    CloseGameDialogComponent,
    EndGameComponent,
    CustomMiniGameComponent,
    SpellingMainComponent,
    SpellingGameComponent,
    SpellingDecisionButtonsComponent,
    SpellingWordComponent,
    SpellingWordCardComponent,
    SpellingGameSoundsButtonComponent,
    GameRulesComponent,
  ],
  imports: [
    CommonModule,
    MiniGamesRoutingModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('audiochallenge', audiochallengeReducer),
    EffectsModule.forFeature([AudiochallengeEffects]),
  ],
})
export class MiniGamesModule {}
