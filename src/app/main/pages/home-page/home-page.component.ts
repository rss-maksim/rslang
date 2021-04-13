import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthorized } from '../../../redux/selectors/user.selector';
import { AppState } from '../../../redux/models/state.model';
import { GAME_CARDS_NEW } from '../../../core/constants/mini-games';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  isAuthorized$: Observable<boolean> = this.store.select(selectIsAuthorized);
  games = GAME_CARDS_NEW;

  constructor(private store: Store<AppState>) {}

  trackByFn(index: number): number {
    return index;
  }
}
