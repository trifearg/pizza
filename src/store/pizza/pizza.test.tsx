import configureMockStore from 'redux-mock-store';
import { defaultPizza } from '../../api/models';
import { DispatchThunk, RootState } from '../state.types';
import { PizzaAction, pizzaActions } from './pizza.actions';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { pizzaReducer, PizzaState } from './pizza.reducer';

const axiosMock = new MockAdapter(axios);

const mockStore = configureMockStore<Partial<RootState>, DispatchThunk>([thunk]);

describe('testing pizza actions', () => {
    afterEach(() => {
        axiosMock.reset();
    });

    it('loading fetching data', () => {
        const expectedActions = [PizzaAction.startFetchingPizza()];
        const store = mockStore({});

        store.dispatch(pizzaActions.onFetchPizza());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('accsess fetching data', async () => {
        axiosMock.onGet('http://localhost:3000/data/pizza.json').reply(200, defaultPizza);

        const expectedActions = [PizzaAction.startFetchingPizza(), PizzaAction.successFetchingPizza(defaultPizza)];
        const store = mockStore({});

        await store.dispatch(pizzaActions.onFetchPizza());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('error fetching data', async () => {
        axiosMock.onGet('http://localhost:3000/data/pizza.json').networkError();
        const expectedActions = [
            PizzaAction.startFetchingPizza(),
            PizzaAction.errorFetchingPizza('Ошибка получения данных'),
        ];
        const store = mockStore({});

        await store.dispatch(pizzaActions.onFetchPizza());
        expect(store.getActions()).toEqual(expectedActions);
    });
});

const initialState: PizzaState = {
    pizza: [],
    fetchingPizza: false,
    fetchingPizzaError: '',
};

describe('testing pizza reducer', () => {
    it('START_FETCHING_PIZZA', () => {
        expect(pizzaReducer(initialState, PizzaAction.startFetchingPizza())).toEqual({
            pizza: [],
            fetchingPizza: true,
            fetchingPizzaError: '',
        });
    });

    it('SUCCESS_FETCHING_PIZZA', () => {
        expect(pizzaReducer(initialState, PizzaAction.successFetchingPizza(defaultPizza))).toEqual({
            pizza: defaultPizza,
            fetchingPizza: false,
            fetchingPizzaError: '',
        });
    });

    it('ERROR_FETCHING_PIZZA', () => {
        expect(pizzaReducer(initialState, PizzaAction.errorFetchingPizza('Ошибка получения данных'))).toEqual({
            pizza: [],
            fetchingPizza: false,
            fetchingPizzaError: 'Ошибка получения данных',
        });
    });
});
