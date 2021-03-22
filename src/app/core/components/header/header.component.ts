import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    iconImagePath = "../../../../assets/images/icons/header/"
    isAuthorization = true;
    userPhoto = "https://ofigenno.com/wp-content/uploads/posts/z/zoi-saldana/1.jpg";
    iconHome = `${this.iconImagePath}home.svg`;
    iconTextbook = `${this.iconImagePath}textbook.svg`;
    iconMiniGames = `${this.iconImagePath}game.svg`;
    iconStatistic = `${this.iconImagePath}statistics.svg`;

    headerMenu = [
      {
        name: 'Home',
        router: ['/home'],
        srcImg: this.iconHome
      },
      {
        name: 'Textbook',
        router: ['/dictionary'],
        srcImg: this.iconTextbook
      },
      {
        name: 'Mini Games',
        router: ['/mini-games'],
        srcImg: this.iconMiniGames
      },
      {
        name: 'Statistics',
        router: ['/statistics'],
        srcImg: this.iconStatistic
      }
    ]

    constructor() {}

}
