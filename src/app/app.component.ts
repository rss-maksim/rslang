import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './redux/models/state.model';
import { fetchUser } from './redux/actions/user.actions';
import { UserService } from './core/services/user.service';
import { fetchTeam } from './redux/actions';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private userService: UserService, private storage: StorageService) {}

  ngOnInit(): void {
    this.store.dispatch(fetchTeam());
    const userId = this.userService.getUserId();
    if (userId) {
      this.store.dispatch(fetchUser({ payload: userId }));
    }

    const theme = this.storage.getItem<string>('theme');
    if (theme) {
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(theme);
    }
  }
}
