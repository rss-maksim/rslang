import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';

import { headerMenu } from './const';
import { IHeaderMenu } from '../../models/IHeaderMenu';
import { userDefaultPhoto } from '../../constants';
import { AppState } from '../../../redux/models/state.model';
import { selectUser } from '../../../redux/selectors/user.selector';
import { UserModel } from '../../../redux/models/user.model';
import { logoutUser } from '../../../redux/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserModel | null> = this.store.select(selectUser);
  userDefaultPhoto = userDefaultPhoto;
  headerMenu = headerMenu;
  isLoginPage = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((route: any) => {
      this.isLoginPage = route.url === '/auth/login';
    });
  }

  trackByFn(index: number, item: IHeaderMenu) {
    return item.name;
  }

  logout(): void {
    this.store.dispatch(logoutUser());
  }
}
