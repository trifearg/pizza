import * as usersActions from './users.actions';
import { UserModel } from '../../api/models';

export interface UsersState {
    users: UserModel[];
    fetchingUsers: boolean;
    fetchingUsersError: string;
}

const initialState: UsersState = {
    users: [],
    fetchingUsers: false,
    fetchingUsersError: '',
};

export const usersReducer = (
  state = initialState,
  action: usersActions.Actions
): UsersState => {
  switch (action.type) {
    case usersActions.START_FETCHING_USERS:
      return {
        ...state,
        fetchingUsers: true,
      }
    case usersActions.FINISH_FETCHING_USERS:
      return {
        ...state,
        fetchingUsers: false,
        users: action.payload,
      }
    case usersActions.FETCHING_USERS_ERROR:
      return {
        ...state,
        fetchingUsers: false,
        fetchingUsersError: action.payload,
      }
    default:
      return state;
  }
};
