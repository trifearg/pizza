import { ThunkDispatch } from 'redux-thunk';

import { Action } from 'redux';
import { UsersState } from './users';

export interface RootState {
  users: UsersState;
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
