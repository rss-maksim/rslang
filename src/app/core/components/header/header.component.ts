import { Component } from '@angular/core';
import { IHeaderMenu } from '../../models/IHeaderMenu';
import { userDefaultPhoto, HeaderLinks } from '../../constants/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthorization = true;
  userPhotoFromApi = '';
  userPhoto = this.userPhotoFromApi || userDefaultPhoto;

  headerMenu = [
    {
      name: 'Главная',
      router: ['/home'],
      srcImg: HeaderLinks.iconHome,
    },
    {
      name: 'Словарь',
      router: ['/dictionary'],
      srcImg: HeaderLinks.iconTextbook,
    },
    {
      name: 'Мини Игры',
      router: ['/mini-games'],
      srcImg: HeaderLinks.iconMiniGames,
    },
    {
      name: 'Статистика',
      router: ['/statistics'],
      srcImg: HeaderLinks.iconStatistic,
    },
  ];

  constructor() {}

  trackByFn(index: number, item: IHeaderMenu) {
    return item.name;
  }
}
