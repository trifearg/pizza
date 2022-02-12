import { ActionsUnion, createAction } from "../actions-helpers"

export enum ModalActionTypes {
    OPEN = "OPEN",
    CLOSE = "CLOSE" 
}

export const ModalAction = {
    open: () => createAction(ModalActionTypes.OPEN),
    close: () => createAction(ModalActionTypes.CLOSE)
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

export type ModalAction = ActionsUnion<typeof ModalAction>