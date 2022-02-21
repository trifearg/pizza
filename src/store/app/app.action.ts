import { Dispatch } from 'redux';
import { PizzaModel, UserModel } from '../../api/models';
import { UsersApi } from '../../api/rest';
import { ActionsUnion, createAction } from '../actions-helpers';

export enum AppActionTypes {
    UPDATE_CITY = "UPDATE_CITY",
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT',
    SET_PRODUCT = 'SET_PRODUCT',
}

export const AppAction = {
    updateCity: (data: string) => createAction(AppActionTypes.UPDATE_CITY, data),
    logoutAction: () => createAction(AppActionTypes.LOGOUT),
    loginSuccessAction: (data: UserModel) => createAction(AppActionTypes.LOGIN_SUCCESS, data),
    loginFailureAction: (error: string) => createAction(AppActionTypes.LOGIN_FAILURE, error),
    setProductToPopup: (data: PizzaModel) => createAction(AppActionTypes.SET_PRODUCT, data)
}

export const updateCity = (city: string) => {
    localStorage.setItem("currentCity", city);
    return {
        type: AppActionTypes.UPDATE_CITY,
        payload: city
    }
}

export const authorization = (login: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const users = await UsersApi.getOrCreateUsers();
            const foundUser = users.find((user) =>
                user.login === login && user.password === password
            )
            if (foundUser) {
                dispatch({ type: AppActionTypes.LOGIN_SUCCESS, payload: foundUser });
            } else {
                dispatch({ type: AppActionTypes.LOGIN_FAILURE, payload: "Такого пользователя не существует." });
            }
        } catch (e) {
            dispatch({ type: AppActionTypes.LOGIN_FAILURE, payload: "Ошибка получения данных пользователей." });
        }
    }
}

export const exit = () => {
    return { type: AppActionTypes.LOGOUT };
}

export const setProduct = (product: PizzaModel) => {
    return { type: AppActionTypes.SET_PRODUCT, payload: product }
} 

export type AppActions = ActionsUnion<typeof AppAction>;