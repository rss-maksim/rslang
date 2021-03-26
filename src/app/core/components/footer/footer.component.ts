import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectTeammates } from '../../../redux/selectors/home.selector';
import { Teammate } from '../../../redux/models/teammate.model';
import { AppState } from '../../../redux/models/state.model';
import { RSSLinks } from '../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  teammates$: Observable<Teammate[]> = this.store.select(selectTeammates);
  rssImage = RSSLinks.image;
  rssUrl = RSSLinks.url;
  constructor(private store: Store<AppState>) {}

  trackByFn(index: number): number {
    return index;
  }
}
