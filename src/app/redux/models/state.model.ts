import { HomeState } from './home.state.model';
import { UserState } from './user.state.model';
import { AudiochallengeState } from './audiochallenge.state.model';
export interface AppState {
  home: HomeState;
  user: UserState;
  audiochallenge: AudiochallengeState;
}
