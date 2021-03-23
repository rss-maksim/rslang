import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectTeammates } from '../../../redux/selectors/home.selector';
import { Teammate } from '../../../redux/models/teammate.model';
import { AppState } from '../../../redux/models/state.model';
import { fetchTeam } from '../../../redux/actions';
import { RSSLinks } from '../../constants/index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  teammates$: Observable<Teammate[]> = this.store.select(selectTeammates);
  rssImage = RSSLinks.image;
  rssUrl = RSSLinks.url;
  constructor(private store: Store<AppState>) {}

  onClick() {
    console.log(this.teammates$);
  }

  ngOnInit() {
    this.store.dispatch(fetchTeam());
  }
}
