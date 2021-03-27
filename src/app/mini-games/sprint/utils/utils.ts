import { Sound, StreakLevel } from 'src/app/core/models/ISprintGame';
import { SoundSrc } from 'src/app/core/constants/sprint-game';

export function getRandomNumber(maxNumber: number): number {
  return Math.floor(Math.random() * maxNumber);
}

export function isTranslationCorrect(): boolean {
  return Math.random() >= 0.5;
}

export function getPointsMultiplier(streak: number) {
  if (streak < StreakLevel.FIRST) return 1;
  if (streak < StreakLevel.SECOND) return 2;
  if (streak < StreakLevel.THIRD) return 3;
  else return 4;
}

export function playSound(src: string) {
  const audio = new Audio();
  if (src === Sound.CORRECT) audio.src = SoundSrc.CORRECT;
  else if (src === Sound.WRONG) audio.src = SoundSrc.WRONG;
  else if (src === Sound.LEVELUP) audio.src = SoundSrc.LEVELUP;
  else audio.src = `data:audio/mpeg;base64,${src}`;
  audio.play();
}

export function getRandomPages() {
  const pages: number[] = [];
  const NUMBER_OF_PAGES = 30;

  while (pages.length < 3) {
    const page = getRandomNumber(NUMBER_OF_PAGES);
    if (!pages.includes(page)) pages.push(page);
  }
  return pages;
}
