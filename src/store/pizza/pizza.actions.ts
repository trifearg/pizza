import { Dispatch } from "redux";
import { PizzaModel } from "../../api/models";
import { PizzaApi } from "../../api/rest/pizza.api";
import { ActionsUnion, createAction } from '../actions-helpers';

export enum PizzaActionTypes {
    START_FETCHING_PIZZA = "START_FETCHING_PIZZA",
    SUCCESS_FETCHING_PIZZA = "SUCCESS_FETCHING_PIZZA",
    ERROR_FETCHING_PIZZA = "ERROR_FETCHING_PIZZA",
}

export const PizzaAction = {
    startFetchingPizza: () => createAction(PizzaActionTypes.START_FETCHING_PIZZA),
    successFetchingPizza: (data: PizzaModel[]) => createAction(PizzaActionTypes.SUCCESS_FETCHING_PIZZA, data),
    errorFetchingPizza: (error: string) => createAction(PizzaActionTypes.ERROR_FETCHING_PIZZA, error)
};

export const pizzaActions = {
    onFetchPizza: () => {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(PizzaAction.startFetchingPizza());
                const data = await PizzaApi.getPizza();
                setTimeout(() => {
                    dispatch(PizzaAction.successFetchingPizza(data));
                }, 1000);
            } catch(e) {
                dispatch(PizzaAction.errorFetchingPizza("Ошибка получения данных"));
            }
        } 
    }
}

export type PizzaActions = ActionsUnion<typeof PizzaAction>;