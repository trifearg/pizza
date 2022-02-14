import { ActionsUnion, createAction } from '../actions-helpers';

export enum CurrentCityActionTypes {
    UPDATE_CITY = "UPDATE_CITY"
}

export const CurrentCityAction = {
    updateCity: (data: string) => createAction(CurrentCityActionTypes.UPDATE_CITY, data),
};

export const updateCity = (city: string) => {
    return {
        type: CurrentCityActionTypes.UPDATE_CITY,
        payload: city
    }
}

export type CurrentCityAction = ActionsUnion<typeof CurrentCityAction> 

