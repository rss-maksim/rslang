import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { TextbookRoutingModule } from './textbook-routing.module';

import {
  TextbookPageComponent,
  TextbookContentComponent,
  DictionaryContentComponent,
  TextbookMenuComponent,
} from './components/index';
import { TextbookContentPageComponent } from './components/textbook-content-page/textbook-content-page.component';
import { WordCardComponent } from './components/word-card/word-card.component';
import { TextbookMiniGamesComponent } from './components/textbook-mini-games/textbook-mini-games.component';
import { TextbookTabNavComponent } from './components/textbook-tab-nav/textbook-tab-nav.component';
import { TextbookPaginationComponent } from './components/textbook-pagination/textbook-pagination.component';
import { TextbookStatisticComponent } from './components/textbook-statistic/textbook-statistic.component';

@NgModule({
  declarations: [
    TextbookPageComponent,
    TextbookContentComponent,
    DictionaryContentComponent,
    TextbookMenuComponent,
    TextbookContentPageComponent,
    WordCardComponent,
    TextbookMiniGamesComponent,
    TextbookTabNavComponent,
    TextbookPaginationComponent,
    TextbookStatisticComponent,
  ],
  imports: [CommonModule, MaterialModule, TextbookRoutingModule, FormsModule],
})
export class TextbookModule {}
