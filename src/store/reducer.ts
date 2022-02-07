import { combineReducers, Reducer } from 'redux';

import { RootState } from './state.types';
import { usersReducer } from './users';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
  users: usersReducer,
});
