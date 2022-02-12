import { createSelector } from 'reselect';

import { RootState } from '../state.types';

export const getUsers = (state: RootState) => state.users;

export const getCurrentUsers = createSelector(
  getUsers,
  usersState => usersState.users
);

export const getFetchingUsers = createSelector(
  getUsers,
  usersState => usersState.fetchingUsers
);

export const getFetchingUsersError = createSelector(
  getUsers,
  usersState => usersState.fetchingUsersError
);