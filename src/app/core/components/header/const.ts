import { HeaderLinks } from '../../constants';

export const headerMenu = [
  {
    name: 'Главная',
    router: ['/'],
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
