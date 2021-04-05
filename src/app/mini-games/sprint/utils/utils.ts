import { Sound, StreakLevel } from 'src/app/core/models/ISprintGame';
import { SoundSrc } from 'src/app/core/constants/sprint-game';
import { NUMBER_OF_PAGES } from 'src/app/core/constants/common';

export function getRandomNumber(maxNumber: number): number {
  return Math.floor(Math.random() * maxNumber);
}

export function getPointsMultiplier(streak: number) {
  if (streak < StreakLevel.FIRST) {
    return 1;
  }
  if (streak < StreakLevel.SECOND) {
    return 2;
  }
  if (streak < StreakLevel.THIRD) {
    return 4;
  } else {
    return 8;
  }
}

export function playSound(src: string) {
  const audio = new Audio();
  if (src === Sound.CORRECT) {
    audio.src = SoundSrc.CORRECT;
  } else if (src === Sound.WRONG) {
    audio.src = SoundSrc.WRONG;
  } else if (src === Sound.LEVELUP) {
    audio.src = SoundSrc.LEVELUP;
  } else {
    audio.src = `data:audio/mpeg;base64,${src}`;
  }
  audio.play();
}

export function playRawSound(src: string) {
  const audio = new Audio();
  audio.src = src;
  audio.play();
}
export function playRawSoundArr(arr: string[]) {
  let sequence_position = 0;

  function play_next() {
    if (sequence_position < arr.length) {
      playSequence();
    }
  }

  function playSequence() {
    const audio = new Audio();
    audio.src = arr[sequence_position];
    audio.removeEventListener('ended', prepareNextAudio);
    audio.addEventListener('ended', prepareNextAudio, true);
    audio.play();
  }

  function prepareNextAudio() {
    sequence_position++;
    play_next();
  }

  playSequence();
}

export function getRandomPages() {
  const pages: number[] = [];

  while (pages.length < 3) {
    const page = getRandomNumber(NUMBER_OF_PAGES);
    if (!pages.includes(page)) {
      pages.push(page);
    }
  }
  return pages;
}
