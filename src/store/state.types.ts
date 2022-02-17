import { ThunkDispatch } from 'redux-thunk';

import { Action } from 'redux';
import { UsersState } from './users';
import { PizzaState } from './pizza';
import { ModalState } from './modal';
import { AppState } from './app';

export interface RootState {
  app: AppState,
  users: UsersState,
  pizza: PizzaState,
  modal: ModalState
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
