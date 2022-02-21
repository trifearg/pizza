import { RootState } from "../state.types";
import { createSelector } from "reselect";

export const getCart = (state: RootState) => state.cart

export const getCurrentCart = createSelector(
    getCart,
    cartState => cartState.cart
)

export const cartIsOpen = createSelector(
    getCart,
    cartState => cartState.isOpen
)

export const getTotalCost = createSelector(
    getCart,
    cartState => cartState.totalCost
)



