import { RootState } from "../state.types";
import { createSelector } from "reselect";

export const getPizza = (state: RootState) => state.pizza;

export const getCurrentPizza = createSelector(
    getPizza,
    pizzaState => pizzaState.pizza
);

export const getFetchingPizza = createSelector(
    getPizza,
    pizzaState => pizzaState.fetchingPizza
);
export const getFetchingPizzaError = createSelector(
    getPizza,
    pizzaState => pizzaState.fetchingPizzaError
);