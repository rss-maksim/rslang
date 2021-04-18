import { HeaderLinks } from '../../constants';

export const headerMenu = [
  {
    name: 'Главная',
    router: ['/home'],
    srcImg: HeaderLinks.iconHome,
    count: 1,
  },
  {
    name: 'Учебник',
    router: ['/textbook'],
    srcImg: HeaderLinks.iconTextbook,
    count: 2,
  },
  {
    name: 'Мини Игры',
    router: ['/mini-games'],
    srcImg: HeaderLinks.iconMiniGames,
    count: 3,
  },
  {
    name: 'Статистика',
    router: ['/statistics'],
    srcImg: HeaderLinks.iconStatistic,
    count: 4,
  },
];
