import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectTeammates } from '../../../redux/selectors/home.selector';
import { Teammate } from '../../../redux/models/teammate.model';
import { AppState } from '../../../redux/models/state.model';
import { fetchTeam } from '../../../redux/actions';

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.scss'],
})
export class AboutTeamComponent implements OnInit {
  teammates$: Observable<Teammate[]> = this.store.select(selectTeammates);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(fetchTeam());
  }

  trackByFn(index: number, { id }: Teammate): string {
    return id;
  }
}
