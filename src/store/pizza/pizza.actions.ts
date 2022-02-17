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

export const onFetchPizza = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({type: PizzaActionTypes.START_FETCHING_PIZZA});
            const data = await PizzaApi.getPizza();
            setTimeout(() => {
                dispatch({type: PizzaActionTypes.SUCCESS_FETCHING_PIZZA, payload: data});
            }, 1000);
        } catch(e) {
            dispatch({type: PizzaActionTypes.ERROR_FETCHING_PIZZA, payload: "Ошибка получения данных"});
        }
    }
}

export type PizzaActions = ActionsUnion<typeof PizzaAction>;