import { ITextbookContentTabs } from 'src/app/core/models/ITextbookContentTabs';

function generateStars(length: number): string {
  return Array.from({ length }, () => '&#10029;').join(' ');
}

export const links: ITextbookContentTabs[] = [
  {
    title: generateStars(1),
    group: '0',
  },
  {
    title: generateStars(2),
    group: '1',
  },
  {
    title: generateStars(3),
    group: '2',
  },
  {
    title: generateStars(4),
    group: '3',
  },
  {
    title: generateStars(5),
    group: '4',
  },
  {
    title: generateStars(6),
    group: '5',
  },
];
