import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectTeammates } from '../../../redux/selectors/home.selector';
import { Teammate } from '../../../redux/models/teammate.model';
import { AppState } from '../../../redux/models/state.model';
import { trigger, transition, query, stagger, animateChild, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.scss'],
  animations: [
    trigger('teamBlockAnim', [
      transition('initial <=> expanded', [query('@childAnimation', stagger(100, [animateChild()]))]),
    ]),
    trigger('childAnimation', [
      state('initial', style({ opacity: 0 })),
      state('expanded', style({ opacity: 1 })),
      transition('initial <=> expanded', [animate('0.1s')]),
    ]),
  ],
})
export class AboutTeamComponent implements AfterViewInit {
  teammates$: Observable<Teammate[]> = this.store.select(selectTeammates);
  state = '';

  @ViewChild('cardsBlock') cardsBlock!: ElementRef;

  constructor(private store: Store<AppState>, private elem: ElementRef) {}

  trackByFn(index: number, { id }: Teammate): string {
    return id;
  }
  ngAfterViewInit() {
    const options = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((elem) => {
        if (elem.isIntersecting) {
          this.state = 'expanded';
          observer.unobserve(elem.target);
        } else {
          this.state = 'initial';
        }
      });
    }, options);
    observer.observe(this.cardsBlock.nativeElement);
  }
}
