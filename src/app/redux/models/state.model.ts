import { HomeState } from './home.state.model';
import { TextbookState } from './textbook.model';
import { UserState } from './user.state.model';
import { AudiochallengeState } from './audiochallenge.state.model';
import { SpellingState } from './spelling.state.model';

export interface AppState {
  home: HomeState;
  user: UserState;
  audiochallenge: AudiochallengeState;
  textbook: TextbookState;
  spelling: SpellingState;
}
