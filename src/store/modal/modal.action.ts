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

export const modalActions = {
    openModal: () => ModalAction.open(),
    closeModal: () => ModalAction.close(),
    setType: (typeModal: string) => ModalAction.typeModal(typeModal)
}

export type ModalActions = ActionsUnion<typeof ModalAction>