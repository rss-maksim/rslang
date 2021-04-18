import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { settingsIcon } from './const';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';
import { setWordSettingsAddButtons, setWordSettingsTranslation } from 'src/app/redux/actions/textbooks.actions';
import { selectIsAuthorized } from 'src/app/redux/selectors/user.selector';
import { selectWordSettingsTranslation, selectWordSettingsAddButtons } from 'src/app/redux/selectors/textbook.selector';

type Position = 'before' | 'after';

@Component({
  selector: 'app-textbook-menu',
  templateUrl: './textbook-menu.component.html',
  styleUrls: ['./textbook-menu.component.scss'],
})
export class TextbookMenuComponent {
  isCheckedTranslation!: boolean;
  isCheckedAddButtons!: boolean;
  labelPosition: Position = 'after';
  disabled = false;
  isAuthorized$ = this.store.select(selectIsAuthorized);
  isCheckedTranslation$ = this.store.select(selectWordSettingsTranslation);
  isCheckedAddButtons$ = this.store.select(selectWordSettingsAddButtons);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private store: Store<AppState>) {
    iconRegistry.addSvgIconLiteral('cog', sanitizer.bypassSecurityTrustHtml(settingsIcon));
  }

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  setWordSettingsTranslation(value: boolean) {
    this.store.dispatch(setWordSettingsTranslation({ payload: value }));
  }

  setWordSettingsAddButtons(value: boolean) {
    this.store.dispatch(setWordSettingsAddButtons({ payload: value }));
  }
}
