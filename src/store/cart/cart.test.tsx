import thunk from 'redux-thunk';
import { DispatchThunk, RootState } from '../state.types';
import configureMockStore from 'redux-mock-store';
import { CartAction, cartActions } from './cart.action';
import { defaultPizza, PizzaModel } from '../../api/models';
import { cartReducer, CartState } from './cart.reducer';

const mockStore = configureMockStore<Partial<RootState>, DispatchThunk>([thunk]);

const pizza: PizzaModel = {
    id: 1,
    name: 'Пепперони',
    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/eb6d128bbcd340e98fd4f14b377e769f_292x292.jpeg',
    description: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, томатный соус',
    price: 249,
};

describe('testing cart actions', () => {
    it('cart is open', () => {
        const store = mockStore({});
        const expectedActions = [CartAction.open()];

        store.dispatch(cartActions.openDrawer());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('cart is close', () => {
        const store = mockStore({});
        const expectedActions = [CartAction.close()];

        store.dispatch(cartActions.closeDrawer());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('add to cart pizza', () => {
        const store = mockStore({});
        const expectedActions = [CartAction.add(pizza)];

        store.dispatch(cartActions.addProduct(pizza));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('delete pizza from cart', () => {
        const store = mockStore({ cart: { isOpen: true, cart: [pizza], totalCost: pizza.price } });
        const expectedActions = [CartAction.delete(1)];

        store.dispatch(cartActions.deleteProduct(1));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('add to total cost, price of pizza', () => {
        const store = mockStore({ cart: { isOpen: false, cart: [pizza], totalCost: pizza.price } });
        const expectedActions = [CartAction.addCost(250)];

        store.dispatch(cartActions.addTotalCost(250));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('subtract to total cost, price of pizza', () => {
        const store = mockStore({ cart: { isOpen: true, cart: [pizza], totalCost: pizza.price } });
        const expectedActions = [CartAction.subtractCost(250)];

        store.dispatch(cartActions.subtractTotalCost(250));
        expect(store.getActions()).toEqual(expectedActions);
    });
});

const initialState: CartState = {
    cart: [],
    totalCost: 0,
    isOpen: false,
};

describe('testing cart reducer', () => {
    it('OPEN_DRAWER', () => {
        expect(cartReducer(initialState, CartAction.open())).toEqual({
            cart: [],
            totalCost: 0,
            isOpen: true,
        });
    });

    it('CLOSE_DRAWER', () => {
        expect(cartReducer(initialState, CartAction.close())).toEqual({
            cart: [],
            totalCost: 0,
            isOpen: false,
        });
    });

    it('ADD_PRODUCT', () => {
        expect(cartReducer(initialState, CartAction.add(pizza))).toEqual({
            cart: [pizza],
            totalCost: 0,
            isOpen: false,
        });
    });

    it('DELETE_PRODUCT', () => {
        const stateWithPizza: CartState = {
            cart: defaultPizza,
            totalCost: 0,
            isOpen: false,
        };
        expect(cartReducer(stateWithPizza, CartAction.delete(2))).toEqual({
            cart: [
                {
                    id: 1,
                    name: 'Пепперони',
                    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/eb6d128bbcd340e98fd4f14b377e769f_292x292.jpeg',
                    description: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, томатный соус',
                    price: 249,
                },
                {
                    id: 3,
                    name: 'Цыпленок ранч',
                    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/d23af75498eb47a8a586313792da917f_292x292.jpeg',
                    description: 'Цыпленок, ветчина, соус ранч, моцарелла, томаты, чеснок',
                    price: 449,
                },
                {
                    id: 4,
                    name: 'Додо',
                    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/3e4065bbc610451f9441a9ced2426f23_292x292.jpeg',
                    description:
                        'Бекон, митболы, пикантная пепперони, моцарелла, томаты, шампиньоны, сладкий перец, красный лук, чеснок, томатный соус',
                    price: 449,
                },
                {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/3bc057459afb4b2b8f2781bd1895b3a9_584x584.jpeg',
                    description: 'Мясной соус болоньезе, соус бургер, соленые огурчики, томаты, красный лук, моцарелла',
                    price: 399,
                },
                {
                    id: 6,
                    name: 'Диабло',
                    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/2ac448e39ba24623a33c1d8d50b69ef8_292x292.jpeg',
                    description:
                        'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла, томатный соус',
                    price: 449,
                },
            ],
            totalCost: 0,
            isOpen: false,
        });
    });

    it('ADD_TOTAL_COST', () => {
        expect(cartReducer(initialState, CartAction.addCost(250))).toEqual({
            cart: [],
            totalCost: 250,
            isOpen: false,
        });
    })

    it('SUBTRACT_TOTAL_COST', () => {
        const stateWithTotalCost: CartState = {
            cart: [],
            totalCost: 5000,
            isOpen: false,
        };
        expect(cartReducer(stateWithTotalCost, CartAction.subtractCost(250))).toEqual({
            cart: [],
            totalCost: 4750,
            isOpen: false,
        });
    })
});
