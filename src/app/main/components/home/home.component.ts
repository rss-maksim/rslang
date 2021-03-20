import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { increment, decrement, reset } from '../../../redux/actions';
import { selectCounter } from '../../../redux/selectors/home.selector';
import { AppState } from '../../../redux/models/state.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    count$!: Observable<number>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.count$ = this.store.select(selectCounter);
    }

    increment() {
        this.store.dispatch(increment());
    }

    decrement() {
        this.store.dispatch(decrement());
    }

    reset() {
        this.store.dispatch(reset());
    }
}
