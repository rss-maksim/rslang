import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthorized } from '../../../redux/selectors/user.selector';
import { AppState } from '../../../redux/models/state.model';
import { GAME_CARDS_NEW } from '../../../core/constants/mini-games';
import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('gamesBlockAnim', [
      transition('initial <=> expanded', [query('@childAnimation', stagger(100, [animateChild()]))]),
    ]),
    trigger('childAnimation', [
      state('initial', style({ opacity: 0 })),
      state('expanded', style({ opacity: 1 })),
      transition('initial <=> expanded', [animate('0.1s')]),
    ]),
  ],
})
export class HomePageComponent implements AfterViewInit {
  isAuthorized$: Observable<boolean> = this.store.select(selectIsAuthorized);
  games = GAME_CARDS_NEW;
  state = '';
  @ViewChild('gamesBlock') gamesBlock!: ElementRef;

  constructor(private store: Store<AppState>, private elem: ElementRef) {}

  ngAfterViewInit() {
    var options = {
      threshold: 0.1,
    };

    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((elem) => {
        if (elem.isIntersecting) {
          this.state = 'expanded';
          observer.unobserve(elem.target);
        } else {
          this.state = 'initial';
        }
      });
    }, options);
    observer.observe(this.gamesBlock.nativeElement);
  }

  trackByFn(index: number): number {
    return index;
  }
}
