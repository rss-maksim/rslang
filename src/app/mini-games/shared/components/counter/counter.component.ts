import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit, OnDestroy {
  @Input() spinnerColor: ThemePalette = 'primary';
  @Input() count = 4;
  @Input() isPaused = false;
  @Output() countIsOver = new EventEmitter();
  increment = 1;
  spinnerValue = 0;
  spinnerMode: ProgressSpinnerMode = 'determinate';
  counterSubscription: Subscription | null = null;

  ngOnInit() {
    this.increment = 100 / this.count;
    this.counterSubscription = interval(1000)
      .pipe(takeWhile(() => this.count > 0))
      .subscribe(
        () => {
          if (this.isPaused) {
            this.spinnerMode = 'indeterminate';
          } else {
            this.spinnerMode = 'determinate';
            this.spinnerValue += this.increment;
            this.count -= 1;
          }
        },
        (error) => {
          console.log(`Error just happened: ${error.message}`);
        },
        () => {
          this.countIsOver.emit();
        },
      );
  }

  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
