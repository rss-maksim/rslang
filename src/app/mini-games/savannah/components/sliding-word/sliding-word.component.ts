import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Animations } from './../../animations';

@Component({
  selector: 'app-sliding-word',
  templateUrl: './sliding-word.component.html',
  styleUrls: ['./sliding-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.wordSlide],
})
export class SlidingWordComponent implements OnInit {
  @Input() word!: string;
  @Input() answerState!: string;
  constructor() {}

  ngOnInit(): void {
    return;
  }

  onAnimationEvent(event: any) {
    console.log(event);
  }
}
