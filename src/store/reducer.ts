import { combineReducers, Reducer } from 'redux';

import { RootState } from './state.types';
import { usersReducer } from './users';
import { currentUserReducer } from './currentUser';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
  users: usersReducer,
  currentUser: currentUserReducer
});
