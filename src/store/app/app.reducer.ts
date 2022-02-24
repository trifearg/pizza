import { PizzaModel, UserModel } from "../../api/models"
import { AppActions, AppActionTypes } from "."

export interface AppState {
    city: string,
    user: UserModel,
    isLogin: boolean,
    error: string,
    product: PizzaModel
}

const initialState: AppState = {
    city:  localStorage.getItem("currentCity") || "Москва",
    user: {
        id: 0,
        login: "",
        password: "",
        name: "",
        role: 0
    },
    isLogin: false,
    error: "",
    product: {
        id: 0,
        name: "",
        photo: "",
        description: "",
        price: 0,
        ingredients: [],
        pizzaType: ""
    }
}

export const appReducer = (state = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case AppActionTypes.UPDATE_CITY:
            return {
                ...state,
                city: action.payload
            }
        case AppActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                error: ""
            }
        case AppActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLogin: false,
                error: action.payload
            }
        case AppActionTypes.LOGOUT:
            return {
                ...state,
                user: {...state.user, id: 0, login: "", password: "", name: "", role: 0},
                isLogin: false,
                error: ""
            }
        case AppActionTypes.SET_PRODUCT: 
            return {
                ...state,
                product: action.payload
            }
        default:
            return state
    }
}