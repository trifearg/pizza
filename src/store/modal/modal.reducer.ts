import { ModalActions, ModalActionTypes } from "./modal.action"

export interface ModalState {
    isOpen: boolean,
    typeModal: string
}

const initialState: ModalState = {
    isOpen: false,
    typeModal: ""
}

export const modalReducer = (state = initialState, action: ModalActions): ModalState => {
    switch(action.type) {
        case ModalActionTypes.CLOSE: 
            return {
                ...state,
                isOpen: false
            }
        
        case ModalActionTypes.OPEN: 
            return {
                ...state,
                isOpen: true
            }

        case ModalActionTypes.TYPE:
            return {
                ...state,
                typeModal: action.payload
            }

        default:
            return state
    }
}
