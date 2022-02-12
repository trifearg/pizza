import { ThunkDispatch } from 'redux-thunk';

import { Action } from 'redux';
import { UsersState } from './users';
import { PizzaState } from './pizza';
import { CurrentUserState } from './currentUser';
import { CurrentCityState } from './currentCity'
import { ModalState } from './modal';

export interface RootState {
  users: UsersState,
  pizza: PizzaState,
  currentUser: CurrentUserState,
  currentCity: CurrentCityState,
  modal: ModalState
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
