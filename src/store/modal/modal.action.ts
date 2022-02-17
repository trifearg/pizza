import { ActionsUnion, createAction } from "../actions-helpers"

export enum ModalActionTypes {
    OPEN = "OPEN",
    CLOSE = "CLOSE",
    TYPE = "TYPE" 
}

export const ModalAction = {
    open: () => createAction(ModalActionTypes.OPEN),
    close: () => createAction(ModalActionTypes.CLOSE),
    typeModal: (data: string) => createAction(ModalActionTypes.TYPE, data)
}

export const openModal = () => {
    return {
        type: ModalActionTypes.OPEN
    }
}

export const closeModal = () => {
    return {
        type: ModalActionTypes.CLOSE
    }
}

export const setType = (typeModal: string) => {
    return {
        type: ModalActionTypes.TYPE,
        payload: typeModal
    }
}

export type ModalActions = ActionsUnion<typeof ModalAction>