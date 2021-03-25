import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCurrentWord, IWord, loadWords, playWordSound } from 'src/app/redux/actions/audiochallenge.actions';
import { selectAudio, selectCurrentWord, selectWords } from 'src/app/redux/selectors/audiochallenge.selectors';
import { AppState } from 'src/app/redux/models/state.model';

@Component({
  selector: 'app-audiochallenge-game',
  templateUrl: './audiochallenge-game.component.html',
  styleUrls: ['./audiochallenge-game.component.scss'],
})
export class AudiochallengeGameComponent implements OnInit {
  currentWord$!: Observable<IWord>;
  audio$!: Observable<HTMLAudioElement>;
  word$!: Observable<IWord[]>;
  words$!: Observable<IWord[]>;
  id!: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadWords());
    this.store.dispatch(getCurrentWord('5e9f5ee35eb9e72bc21af4a1'));
    this.currentWord$ = this.store.select(selectCurrentWord);
    this.audio$ = this.store.select(selectAudio);
    this.words$ = this.store.select(selectWords);
    this.words$.subscribe((value) => {
      if (value.length > 0) {
        this.id = value[value.length - 1].id;
      }
    });
  }

  play() {
    this.store.dispatch(playWordSound());
  }
}
