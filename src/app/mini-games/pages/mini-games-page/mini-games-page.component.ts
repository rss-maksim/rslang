import { Component } from '@angular/core';

type GameCard = {
  name: string;
  icon: string;
  description: string;
};

@Component({
  selector: 'app-mini-games-page',
  templateUrl: './mini-games-page.component.html',
  styleUrls: ['./mini-games-page.component.scss'],
})
export class MiniGamesPageComponent {
  gameCards: GameCard[] = [
    {
      name: 'Спринт',
      icon: 'timer',
      description:
        'Учит быстро переводить с английского на ваш родной язык. Для этой тренировки используются слова из вашего словаря',
    },
    { name: 'Аудиовызов', icon: 'audiotrack', description: 'Улучшает восприятие английской речи на слух' },
    {
      name: 'Саванна',
      icon: 'pets',
      description: 'Оттачивает понимание речи и быстрого перевода слов, помогает не забыть выученные слова',
    },
    {
      name: 'Своя игра',
      icon: 'contact_support',
      description: 'Помогает не забывать уже выученные слова, тренировка проходит по алгоритму "кривой забывания"',
    },
  ];

  constructor() {}
}
