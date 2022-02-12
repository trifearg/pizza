import { RootState } from "../state.types";
import { createSelector } from "reselect";

export const getUser = (state: RootState) => state.currentUser;

export const getCurrentUser = createSelector(
    getUser,
    currentUserState => currentUserState.user
);

export const isLogin = createSelector(
    getUser,
    currentUserState => currentUserState.isLogin
);

export const error = createSelector(
    getUser,
    currentUserState => currentUserState.error
);