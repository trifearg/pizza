import { PizzaModel } from "../../api/models";
import { PizzaActions, PizzaActionTypes } from "./pizza.actions";

export interface PizzaState {
    pizza: PizzaModel[],
    fetchingPizza: boolean;
    fetchingPizzaError: string;
}

const initialState: PizzaState = {
    pizza: [],
    fetchingPizza: false,
    fetchingPizzaError: ""
}

export const pizzaReducer = (state = initialState, action: PizzaActions): PizzaState => {
    switch (action.type) {
        case PizzaActionTypes.START_FETCHING_PIZZA:
            return {
                ...state,
                fetchingPizza: true
            }
        case PizzaActionTypes.SUCCESS_FETCHING_PIZZA:
            return {
                ...state,
                pizza: action.payload,
                fetchingPizza: false
            }
        case PizzaActionTypes.ERROR_FETCHING_PIZZA:
            return {
                ...state,
                fetchingPizza: false,
                fetchingPizzaError: action.payload
            }
        default:
            return state
    }
}