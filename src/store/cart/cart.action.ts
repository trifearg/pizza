import { PizzaModel } from "../../api/models";
import { ActionsUnion, createAction } from "../actions-helpers";

export enum CartActionTypes {
    OPEN_DRAWER = "OPEN_DRAWER",
    CLOSE_DRAWER = "CLOSE_DRAWER",
    ADD_PRODUCT = "ADD_PRODUCT",
    DELETE_PRODUCT = "DELETE_PRODUCT",
    ADD_TOTAL_COST = "ADD_TOTAL_COST",
    SUBTRACT_TOTAL_COST = "SUBTRACT_TOTAL_COST"
}

export const CartAction = {
    open: () => createAction(CartActionTypes.OPEN_DRAWER),
    close: () => createAction(CartActionTypes.CLOSE_DRAWER),
    add: (data: PizzaModel) => createAction(CartActionTypes.ADD_PRODUCT, data),
    delete: (data: string | number) => createAction(CartActionTypes.DELETE_PRODUCT, data),
    addCost: (data: number) => createAction(CartActionTypes.ADD_TOTAL_COST, data),
    subtractCost: (data: number) => createAction(CartActionTypes.SUBTRACT_TOTAL_COST, data)
}

export const openDrawer = () => {
    return {
        type: CartActionTypes.OPEN_DRAWER
    }
}

export const closeDrawer = () => {
    return {
        type: CartActionTypes.CLOSE_DRAWER
    }
}

export const addProduct = (product: PizzaModel) => {
    return {
        type: CartActionTypes.ADD_PRODUCT,
        payload: product
    }
}

export const deleteProduct = (id: string | number) => {
    return {
        type: CartActionTypes.DELETE_PRODUCT,
        payload: id
    }
}

export const addTotalCost = (price: number) => {
    return {
        type: CartActionTypes.ADD_TOTAL_COST,
        payload: price
    }
}

export const subtractTotalCost = (price: number) => {
    return {
        type: CartActionTypes.SUBTRACT_TOTAL_COST,
        payload: price
    }
}


export type CartActions = ActionsUnion<typeof CartAction>