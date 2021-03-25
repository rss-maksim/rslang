import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectTeammates } from '../../../redux/selectors/home.selector';
import { Teammate } from '../../../redux/models/teammate.model';
import { AppState } from '../../../redux/models/state.model';

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.scss'],
})
export class AboutTeamComponent {
  teammates$: Observable<Teammate[]> = this.store.select(selectTeammates);

  constructor(private store: Store<AppState>) {}

  trackByFn(index: number, { id }: Teammate): string {
    return id;
  }
}
