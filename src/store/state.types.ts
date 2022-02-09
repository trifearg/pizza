import { ThunkDispatch } from 'redux-thunk';

import { Action } from 'redux';
import { UsersState } from './users';
import { CurrentUserState } from './currentUser';

export interface RootState {
  users: UsersState,
  currentUser: CurrentUserState
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
