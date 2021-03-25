import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import homeReducer from './redux/reducers/homeReducer';
import { MainModule } from './main/main.module';
import { TeamEffects } from './redux/effects/team.effect';
import audiochallengeReducer from './redux/reducers/audiochallengeReducer';
import { AudiochallengeEffects } from './redux/effects/audiochallenge.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    MainModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ home: homeReducer, audiochallenge: audiochallengeReducer }),
    EffectsModule.forRoot([TeamEffects, AudiochallengeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
