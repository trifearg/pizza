import { Dispatch } from "redux"
import { UserModel } from "../../api/models"
import { UsersApi } from './../../api/rest/users.api';

export enum CurrentUserActionTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT'
}

interface LogoutAction {
    type: CurrentUserActionTypes.LOGOUT;
}

interface LoginSuccessAction {
    type: CurrentUserActionTypes.LOGIN_SUCCESS;
    payload: UserModel
}

interface LoginFailureAction {
    type: CurrentUserActionTypes.LOGIN_FAILURE;
    payload: string
}

export type CurrentUserAction = LoginSuccessAction | LoginFailureAction | LogoutAction

export const authorization = (login: string, password: string) => {
    return async (dispatch: Dispatch<CurrentUserAction>) => {
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
    return { type: "LOGOUT" };
}