import { render } from '@testing-library/react';
import { PizzaModel } from '../../api/models';
import Cart from './Cart';

const pizza = [
    {
        id: 1,
        name: 'Пепперони',
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/eb6d128bbcd340e98fd4f14b377e769f_292x292.jpeg',
        price: 249,
        ingredients: [
            {
                name: 'Ветчина',
                price: 79,
                photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
                added: false,
            },
            {
                name: 'Томаты',
                price: 79,
                photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
                added: false,
            },
        ],
        pizzaType: 'Маленькая',
    },
    {
        id: 2,
        name: 'Додо Микс',
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/9f4fe925ef56492c93eb1d95254ad29d_292x292.jpeg',
        price: 499,
        ingredients: [],
        pizzaType: 'Маленькая',
    },
    {
        id: 3,
        name: 'Цыпленок ранч',
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/d23af75498eb47a8a586313792da917f_292x292.jpeg',
        price: 449,
        ingredients: [
            {
                name: 'Ветчина',
                price: 79,
                photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
                added: false,
            },
        ],
        pizzaType: 'Маленькая',
    },
];

describe('testing Cart', () => {
    it('render empty cart', () => {
        const cart: PizzaModel[] = [];
        const isOpenCart = true;
        const cartClose = jest.fn();
        const deleteProductFromCart = jest.fn();
        const totalCost = 0;
        const subtractCost = jest.fn();
        const { getByText } = render(
            <Cart
                cart={cart}
                isOpenCart={isOpenCart}
                cartClose={cartClose}
                deleteProductFromCart={deleteProductFromCart}
                totalCost={totalCost}
                subtractCost={subtractCost}
            />
        );

        expect(getByText('Ваша корзина пуста!')).toBeInTheDocument();
        expect(getByText('Выберите конкретную пиццу на главной странице и оформите заказ.')).toBeInTheDocument();
    });

    it('render cart with pizza', () => {
        const cart: PizzaModel[] = pizza;
        const isOpenCart = true;
        const cartClose = jest.fn();
        const deleteProductFromCart = jest.fn();
        const totalCost = 0;
        const subtractCost = jest.fn();
        const { getByText } = render(
            <Cart
                cart={cart}
                isOpenCart={isOpenCart}
                cartClose={cartClose}
                deleteProductFromCart={deleteProductFromCart}
                totalCost={totalCost}
                subtractCost={subtractCost}
            />
        );

        expect(getByText('Пепперони')).toBeInTheDocument();
        expect(getByText('Додо Микс')).toBeInTheDocument();
        expect(getByText('Цыпленок ранч')).toBeInTheDocument();
    });
});
