import { animate, sequence, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { flash } from 'ng-animate';

export const Animations = {
  wordSlide: trigger('word-slide', [
    state('right', style({})),
    state('wrong', style({})),
    transition('* => right', [animate(300, style({ width: '1px', overflow: 'hidden', bottom: 0 }))]),
    transition('* => wrong', [useAnimation(flash)]),
    transition(':enter', [
      style({ opacity: 0 }),
      sequence([
        animate(200, style({ opacity: 1 })),
        animate(2800, style({ bottom: 0 })),
        animate(200, style({ opacity: 0 })),
      ]),
    ]),
  ]),
};
