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
  themes = [
    { value: 'blue-teal', viewValue: 'Blue & Teal' },
    { value: 'deeppurple-amber', viewValue: 'Deep Purple & Amber' },
    { value: 'indigo-pink', viewValue: 'Indigo & Pink' },
    { value: 'pink-bluegrey', viewValue: 'Pink & Blue-Grey' },
    { value: 'purple-green', viewValue: 'Purple & Green' },
  ];
  selectedValue = 'blue-teal';
  isChecked = false;

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

  onSliderToggle(toggle: any) {
    console.log(toggle.checked);
    this.isChecked = toggle.checked;
    if (this.isChecked) {
      document.body.classList.remove('blue-teal');
      document.body.classList.add('pink-bluegrey');
    } else {
      document.body.classList.remove('pink-bluegrey');
      document.body.classList.add('blue-teal');
    }
  }

  /*onSelect(selection: any) {
    switch (selection.target.value) {
      case 'blue-teal': {
        document.body.classList.remove('deeppurple-amber', 'indigo-pink', 'pink-bluegrey', 'purple-green');
        document.body.classList.add('blue-teal');
        break;
      }

      case 'deeppurple-amber': {
        document.body.classList.remove('blue-teal', 'indigo-pink', 'pink-bluegrey', 'purple-green');
        document.body.classList.add('deeppurple-amber');
        break;
      }
      case 'indigo-pink': {
        document.body.classList.remove('blue-teal', 'deeppurple-amber', 'pink-bluegrey', 'purple-green');
        document.body.classList.add('indigo-pink');
        break;
      }
      case 'pink-bluegrey': {
        document.body.classList.remove('blue-teal', 'deeppurple-amber', 'indigo-pink', 'purple-green');
        document.body.classList.add('pink-bluegrey');
        break;
      }
      case 'purple-green': {
        document.body.classList.remove('deeppurple-amber', 'indigo-pink', 'pink-bluegrey');
        document.body.classList.add('purple-green');
        break;
      }
    }
  }*/
}
