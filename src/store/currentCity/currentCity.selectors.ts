import { RootState } from "../state.types";
import { createSelector } from "reselect";

export const getCity = (state: RootState) => state.currentCity;

export const getCurrentCity = createSelector(
    getCity,
    currentCityState => currentCityState.city
);