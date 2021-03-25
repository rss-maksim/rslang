import { HomeState } from './home.state.model';
import { AudiochallengeState } from './audiochallenge.state.model';

export interface AppState {
  home: HomeState;
  audiochallenge: AudiochallengeState;
}
