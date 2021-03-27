import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthorized } from '../../../redux/selectors/user.selector';
import { AppState } from '../../../redux/models/state.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  isAuthorized$: Observable<boolean> = this.store.select(selectIsAuthorized);

  constructor(private store: Store<AppState>) {}
}
