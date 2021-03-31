export type GameCard = {
  name: string;
  icon: string;
  route: string;
  description: string;
};

export const ASSETS_API_URL = 'https://raw.githubusercontent.com/rss-maksim/LearnWords/master';

export enum Games {
  SPRINT = 'Спринт',
  AUDIOCHALLENGE = 'Аудиовызов',
  SAVANNAH = 'Саванна',
  CUSTOM_GAME = 'Своя игра',
}

export const GAME_CARDS: GameCard[] = [
  {
    name: 'Спринт',
    icon: 'timer',
    route: 'sprint',
    description:
      'Учит быстро переводить с английского на ваш родной язык. Для этой тренировки используются слова из вашего словаря',
  },
  {
    name: 'Аудиовызов',
    icon: 'audiotrack',
    route: 'audiochallenge',
    description: 'Улучшает восприятие английской речи на слух',
  },
  {
    name: 'Саванна',
    icon: 'pets',
    route: 'savannah',
    description: 'Оттачивает понимание речи и быстрого перевода слов, помогает не забыть выученные слова',
  },
  {
    name: 'Своя игра',
    icon: 'contact_support',
    route: 'custom-game',
    description: 'Помогает не забывать уже выученные слова, тренировка проходит по алгоритму "кривой забывания"',
  },
];
