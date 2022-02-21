import { RootState } from "../state.types";
import { createSelector } from "reselect";

export const getApp = (state: RootState) => state.app;

export const getCurrentCity = createSelector(
    getApp,
    currentCityState => currentCityState.city
);

export const getCurrentUser = createSelector(
    getApp,
    currentUserState => currentUserState.user
);

export const isLogin = createSelector(
    getApp,
    currentUserState => currentUserState.isLogin
);

export const error = createSelector(
    getApp,
    currentUserState => currentUserState.error
);

export const getCurrentProduct = createSelector(
    getApp,
    currentProduct => currentProduct.product
);