import { RootState } from "../state.types";
import { createSelector } from "reselect";

export const getModal = (state: RootState) => state.modal;

export const modalIsOpen = createSelector(
    getModal,
    modalState => modalState.isOpen
);

export const modalType = createSelector(
    getModal,
    modalState => modalState.typeModal
)
