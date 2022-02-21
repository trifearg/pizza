import { CartActions, CartActionTypes } from ".";
import { PizzaModel } from "../../api/models";

export interface CartState {
    cart: Array<PizzaModel>,
    totalCost: number
    isOpen: boolean
}

const initialState: CartState = {
    cart: [],
    totalCost: 0,
    isOpen: false
}

export const cartReducer = (state = initialState, action: CartActions): CartState => {
    switch(action.type) {
        case CartActionTypes.OPEN_DRAWER: 
            return {
                ...state,
                isOpen: true
            }

        case CartActionTypes.CLOSE_DRAWER:
            return {
                ...state,
                isOpen: false
            }

        case CartActionTypes.ADD_PRODUCT:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case CartActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }

        case CartActionTypes.ADD_TOTAL_COST:
            return {
                ...state,
                totalCost: state.totalCost + action.payload
            }

        case CartActionTypes.SUBTRACT_TOTAL_COST:
            return {
                ...state,
                totalCost: state.totalCost - action.payload
            }
        default:
            return state
    }
}