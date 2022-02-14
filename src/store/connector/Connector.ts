import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { UserModel } from "../../api/models";
import { DispatchThunk, RootState } from "../state.types";
import { getFetchingUsers, getFetchingUsersError, getUsers, Thunks as usersThunks } from "../users";
import { getCurrentCity, updateCity } from "../currentCity";
import { getUser, isLogin, error, authorization, exit } from "../currentUser";
import { getCurrentPizza, getFetchingPizza, getFetchingPizzaError, onFetchPizza } from "../pizza";
import { modalIsOpen, openModal, closeModal } from "../modal";

export const Connector = connect(
    (state: RootState) => ({
        users: getUsers(state),
        fetchingUsers: getFetchingUsers(state),
        fetchingUsersError: getFetchingUsersError(state),
        pizza: getCurrentPizza(state),
        fetchingPizza: getFetchingPizza(state),
        fetchingPizzaError: getFetchingPizzaError(state),
        currentUser: getUser(state),
        currentUserIsLogin: isLogin(state),
        currentUserError: error(state),
        currentCity: getCurrentCity(state),
        isOpen: modalIsOpen(state)
    }),
    (dispatch: DispatchThunk) => ({
        fetchUsers: () => {
            dispatch(usersThunks.onFetchUsers());
        },
        updateUsers: (users: UserModel[]) => {
            dispatch(usersThunks.onUpdateUsers(users));
        },
        fetchPizza: () => {
            dispatch(onFetchPizza());
        },
        updateCurrentCity: (city: string) => {
            dispatch(updateCity(city))
        },
        authorizationCurrentUser: (login: string, password: string) => {
            dispatch(authorization(login, password))
        },
        logoutCurrentUser: () => {
            dispatch(exit())
        },
        modalOpen: () => {
            dispatch(openModal())
        },
        modalClose: () => {
            dispatch(closeModal())
        }
    })
);

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
export type PropsFromRedux = GetProps<typeof Connector>;