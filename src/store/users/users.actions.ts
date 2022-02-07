import { UserModel } from './../../api/models/user.model';
import { UsersApi } from './../../api/rest/users.api';

import { Dispatch } from 'redux';
import { ActionsUnion, createAction } from '../actions-helpers';

export const START_FETCHING_USERS = '[app] START_FETCHING_USERS';
export const FINISH_FETCHING_USERS = '[app] FINISH_FETCHING_USERS';
export const FETCHING_USERS_ERROR = '[app] FETCHING_USERS_ERROR';

export const Actions = {
    startFetchingUsers: () => createAction(START_FETCHING_USERS),
    finishFetchingUsers: (data: UserModel[]) => createAction(FINISH_FETCHING_USERS, data),
    fetchingUsersError: (error: string) => createAction(FETCHING_USERS_ERROR, error),
};

export const Thunks = {
     onFetchUsers: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingUsers());
            UsersApi.getOrCreateUsers()
            .then((result) => {
                dispatch(Actions.finishFetchingUsers(result));
            })
            .catch(error => dispatch(Actions.fetchingUsersError(error)));
        }
    },
    onUpdateUsers: (users: UserModel[]) => {
       return (dispatch: Dispatch) => {
           dispatch(Actions.startFetchingUsers());
           UsersApi.updateUsers(users)
           .then((result) => {
               dispatch(Actions.finishFetchingUsers(result));
           })
           .catch(error => dispatch(Actions.fetchingUsersError(error)));
       }
   },
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
