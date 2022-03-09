import configureMockStore from 'redux-mock-store';
import { DispatchThunk, RootState } from '../state.types';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import { appReducer, initialStateApp } from './app.reducer';
import { AppAction, appActions } from './app.action';
import { defaultPizza, defaultUsers } from '../../api/models';

const axiosMock = new MockAdapter(axios);

const mockStore = configureMockStore<Partial<RootState>, DispatchThunk>([thunk]);

describe('testing app actions', () => {
    it('update city', () => {
        const store = mockStore({
            app: initialStateApp,
        });
        const expectedActions = [AppAction.updateCity('Самара')];

        store.dispatch(appActions.updateCity('Самара'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('login failure', async () => {
        axiosMock.onGet('http://localhost:3000/data/users.json').reply(200, defaultUsers);
        const store = mockStore({});
        const expectedActions = [AppAction.loginFailureAction('Такого пользователя не существует.')];

        await store.dispatch(appActions.authorization('asd', 'asd'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('login succsess', async () => {
        axiosMock.onGet('http://localhost:3000/data/users.json').reply(200, defaultUsers);
        const store = mockStore({});
        const expectedActions = [AppAction.loginSuccessAction(defaultUsers[0])];

        await store.dispatch(appActions.authorization('pasha', 'qwerty'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('logout', () => {
        const store = mockStore({
            app: {
                city: 'Москва',
                error: '',
                isLogin: true,
                product: initialStateApp.product,
                user: defaultUsers[0],
            },
        });
        const expectedActions = [AppAction.logoutAction()];

        store.dispatch(appActions.exit());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('set product', () => {
        const store = mockStore({});
        const expectedActions = [AppAction.setProductToPopup(defaultPizza[0])];

        store.dispatch(appActions.setProduct(defaultPizza[0]));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

describe('testing app reducer', () => {
    it('UPDATE_CITY', () => {
        expect(appReducer(initialStateApp, AppAction.updateCity('Самара'))).toEqual({
            city: 'Самара',
            user: {
                id: 0,
                login: '',
                password: '',
                name: '',
                role: 0,
            },
            isLogin: false,
            error: '',
            product: {
                id: 0,
                name: '',
                photo: '',
                description: '',
                price: 0,
                ingredients: [],
                pizzaType: '',
            },
        });
    });

    it('LOGIN_SUCCESS', () => {
        expect(appReducer(initialStateApp, AppAction.loginSuccessAction(defaultUsers[0]))).toEqual({
            city: 'Москва',
            user: defaultUsers[0],
            isLogin: true,
            error: '',
            product: {
                id: 0,
                name: '',
                photo: '',
                description: '',
                price: 0,
                ingredients: [],
                pizzaType: '',
            },
        });
    });

    it('LOGIN_FAILURE', () => {
        expect(appReducer(initialStateApp, AppAction.loginFailureAction('Такого пользователя не существует'))).toEqual({
            city: 'Москва',
            user: {
                id: 0,
                login: '',
                password: '',
                name: '',
                role: 0,
            },
            isLogin: false,
            error: 'Такого пользователя не существует',
            product: {
                id: 0,
                name: '',
                photo: '',
                description: '',
                price: 0,
                ingredients: [],
                pizzaType: '',
            },
        });
    });

    it('LOGOUT', () => {
        expect(appReducer(initialStateApp, AppAction.logoutAction())).toEqual({
            city: 'Москва',
            user: {
                id: 0,
                login: '',
                password: '',
                name: '',
                role: 0,
            },
            isLogin: false,
            error: '',
            product: {
                id: 0,
                name: '',
                photo: '',
                description: '',
                price: 0,
                ingredients: [],
                pizzaType: '',
            },
        });
    });

    it('SET_PRODUCT', () => {
        expect(appReducer(initialStateApp, AppAction.setProductToPopup(defaultPizza[0]))).toEqual({
            city: 'Москва',
            user: {
                id: 0,
                login: '',
                password: '',
                name: '',
                role: 0,
            },
            isLogin: false,
            error: '',
            product: defaultPizza[0],
        });
    });
});
