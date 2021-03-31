import { animate, sequence, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { flash } from 'ng-animate';

export const Animations = {
  wordSlide: trigger('word-slide', [
    state('right', style({})),
    state('wrong', style({})),
    transition('* => right', [animate(300, style({ width: '1px', overflow: 'hidden', bottom: 0 }))]),
    transition('* => wrong', [useAnimation(flash)]),
  ]),
};
