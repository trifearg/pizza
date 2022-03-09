import thunk from 'redux-thunk';
import { DispatchThunk, RootState } from '../state.types';
import configureMockStore from 'redux-mock-store';
import { ModalAction, modalActions } from './modal.action';
import { modalReducer, ModalState } from './modal.reducer';

const mockStore = configureMockStore<Partial<RootState>, DispatchThunk>([thunk]);

describe('testing modal actions', () => {
    it('modal is open', () => {
        const store = mockStore({});
        const expectedActions = [ModalAction.open()];

        store.dispatch(modalActions.openModal());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('modal is not open', () => {
        const store = mockStore({});
        const expectedActions = [ModalAction.close()];

        store.dispatch(modalActions.closeModal());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('modal type', () => {
        const store = mockStore({});
        const expectedActions = [ModalAction.typeModal('pizzaModel')];

        store.dispatch(modalActions.setType('pizzaModel'));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

const initialState: ModalState = {
    isOpen: false,
    typeModal: '',
};

describe('testing modal reducer', () => {
    it('OPEN', () => {
        expect(modalReducer(initialState, ModalAction.open())).toEqual({
            isOpen: true,
            typeModal: '',
        });
    });

    it('CLOSE', () => {
        expect(modalReducer(initialState, ModalAction.close())).toEqual({
            isOpen: false,
            typeModal: '',
        });
    });

    it('TYPE', () => {
        expect(modalReducer(initialState, ModalAction.typeModal('pizzaModel'))).toEqual({
            isOpen: false,
            typeModal: 'pizzaModel',
        });
    });
});
