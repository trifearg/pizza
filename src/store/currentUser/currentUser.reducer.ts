import { UserModel } from "../../api/models";
import { CurrentUserAction, CurrentUserActionTypes } from "./currentUser.action";

export interface CurrentUserState {
    user: UserModel,
    isLogin: boolean,
    error: string
}

const initialState: CurrentUserState = {
    user: {
        id: 0,
        login: "",
        password: "",
        name: "",
        role: 0
    },
    isLogin: false,
    error: ""
}

export const currentUserReducer = (state = initialState, action: CurrentUserAction): CurrentUserState => {
    switch (action.type) {
        case CurrentUserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLogin: true
            }
        case CurrentUserActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLogin: false,
                error: action.payload
            }
        case CurrentUserActionTypes.LOGOUT:
            return {
                ...state,
                isLogin: false,
                error: ""
            }
        default:
            return state
    }
}