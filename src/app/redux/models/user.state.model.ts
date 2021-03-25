import { UserModel } from './user.model';

export interface UserState {
  user: UserModel | null;
  isAuthorized: boolean;
}
