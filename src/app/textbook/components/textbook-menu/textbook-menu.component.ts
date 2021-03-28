import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { settingsIcon } from './const';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/models/state.model';
import { setWordSettingsAddButtons, setWordSettingsTranslation } from 'src/app/redux/actions/textbooks.actions';
import { selectIsAuthorized } from 'src/app/redux/selectors/user.selector';

@Component({
  selector: 'app-textbook-menu',
  templateUrl: './textbook-menu.component.html',
  styleUrls: ['./textbook-menu.component.scss'],
})
export class TextbookMenuComponent {
  isCheckedTranslation = false;
  isCheckedAddButtons = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  isAuthorized$ = this.store.select(selectIsAuthorized);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private store: Store<AppState>) {
    iconRegistry.addSvgIconLiteral('cog', sanitizer.bypassSecurityTrustHtml(settingsIcon));
  }

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  setWordSettingsTranslation() {
    this.store.dispatch(setWordSettingsTranslation({ payload: this.isCheckedTranslation }));
  }

  setWordSettingsAddButtons() {
    this.store.dispatch(setWordSettingsAddButtons({ payload: this.isCheckedAddButtons }));
  }
}
