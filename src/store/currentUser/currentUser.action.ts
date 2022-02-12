import { Dispatch } from "redux"
import { UserModel } from "../../api/models"
import { UsersApi } from './../../api/rest/users.api';
import { ActionsUnion, createAction } from '../actions-helpers';

export enum CurrentUserActionTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT'
}

export const CurrentUserAction = {
    logoutAction: () => createAction(CurrentUserActionTypes.LOGOUT),
    loginSuccessAction: (data: UserModel) => createAction(CurrentUserActionTypes.LOGIN_SUCCESS, data),
    loginFailureAction: (error: string) => createAction(CurrentUserActionTypes.LOGIN_FAILURE, error)
}

export const authorization = (login: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const users = await UsersApi.getOrCreateUsers();
            const foundUser = users.find((user) =>
                user.login === login && user.password === password
            )
            if (foundUser) {
                dispatch({ type: CurrentUserActionTypes.LOGIN_SUCCESS, payload: foundUser });
            } else {
                dispatch({ type: CurrentUserActionTypes.LOGIN_FAILURE, payload: "Такого пользователя не существует." });
            }
        } catch (e) {
            dispatch({ type: CurrentUserActionTypes.LOGIN_FAILURE, payload: "Ошибка получения данных пользователей." });
        }
    }
}

export const exit = () => {
    return { type: CurrentUserActionTypes.LOGOUT };
}

export type CurrentUserAction = ActionsUnion<typeof CurrentUserAction>;