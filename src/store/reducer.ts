import { combineReducers, Reducer } from 'redux';

import { RootState } from './state.types';
import { usersReducer } from './users';
import { pizzaReducer } from './pizza';
import { modalReducer } from './modal';
import { appReducer } from './app';


export const reducer: Reducer<RootState> = combineReducers<RootState>({
  app: appReducer,
  users: usersReducer,
  pizza: pizzaReducer,
  modal: modalReducer
});
