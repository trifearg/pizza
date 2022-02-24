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

export const appActions = {
    updateCity: (city: string) => {
        localStorage.setItem("currentCity", city);
        return AppAction.updateCity(city);
    },
    authorization: (login: string, password: string) => {
        return async (dispatch: Dispatch) => {
            try {
                const users = await UsersApi.getOrCreateUsers();
                const foundUser = users.find((user) =>
                    user.login === login && user.password === password
                )
                if (foundUser) {
                    dispatch(AppAction.loginSuccessAction(foundUser));
                } else {
                    dispatch(AppAction.loginFailureAction("Такого пользователя не существует."));
                }
            } catch (e) {
                dispatch(AppAction.loginFailureAction("Ошибка получения данных пользователей."));
            }
        }
    },
    exit: () => AppAction.logoutAction(),
    setProduct: (product: PizzaModel) => AppAction.setProductToPopup(product)
}

export type AppActions = ActionsUnion<typeof AppAction>;