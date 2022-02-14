import { CurrentCityActionTypes, CurrentCityAction } from "."

export interface CurrentCityState {
    city: string
}

const initialState: CurrentCityState = {
    city: "Москва"
}

export const currentCityReducer = (state = initialState, action: CurrentCityAction): CurrentCityState => {
    switch (action.type) {
        case CurrentCityActionTypes.UPDATE_CITY:
            return {
                ...state,
                city: action.payload
            }
        default:
            return state
    }
}