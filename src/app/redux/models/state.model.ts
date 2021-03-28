import { HomeState } from './home.state.model';
import { TextbookState } from './textbook.model';
import { UserState } from './user.state.model';

export interface AppState {
  home: HomeState;
  user: UserState;
  textbook: TextbookState;
}
