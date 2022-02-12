import { ModalAction, ModalActionTypes } from "./modal.action"

export interface ModalState {
    isOpen: boolean
}

const initialState: ModalState = {
    isOpen: false
}

export const modalReducer = (state = initialState, action: ModalAction): ModalState => {
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

        default:
            return state
    }
}
