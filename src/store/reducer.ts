import { combineReducers, Reducer } from 'redux';

import { RootState } from './state.types';
import { usersReducer } from './users';
import { pizzaReducer } from './pizza';
import { currentUserReducer } from './currentUser';
import { currentCityReducer } from './currentCity';
import { modalReducer } from './modal';


export const reducer: Reducer<RootState> = combineReducers<RootState>({
  users: usersReducer,
  pizza: pizzaReducer,
  currentUser: currentUserReducer,
  currentCity: currentCityReducer,
  modal: modalReducer
});
