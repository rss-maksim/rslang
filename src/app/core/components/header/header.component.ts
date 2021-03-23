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
      name: 'Home',
      router: ['/home'],
      srcImg: HeaderLinks.iconHome,
    },
    {
      name: 'Textbook',
      router: ['/dictionary'],
      srcImg: HeaderLinks.iconTextbook,
    },
    {
      name: 'Mini Games',
      router: ['/mini-games'],
      srcImg: HeaderLinks.iconMiniGames,
    },
    {
      name: 'Statistics',
      router: ['/statistics'],
      srcImg: HeaderLinks.iconStatistic,
    },
  ];

  constructor() {}

  trackByFn(index: number, item: IHeaderMenu) {
    return item.name;
  }
}
