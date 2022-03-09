import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PizzaPopup from './PizzaPopup';

const product = {
    id: 1,
    name: 'Пепперони',
    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/eb6d128bbcd340e98fd4f14b377e769f_292x292.jpeg',
    price: 249,
};

describe('testing PizzaPopup', () => {
    it('render component', () => {
        const addProductToCart = jest.fn();
        const modalClose = jest.fn();
        const addCost = jest.fn();
        const { getByText } = render(
            <PizzaPopup product={product} addProductToCart={addProductToCart} modalClose={modalClose} addCost={addCost} />
        );

        expect(getByText('Пепперони')).toBeInTheDocument();
    });

    it('add ingredient and check total price', () => {
        const addProductToCart = jest.fn();
        const modalClose = jest.fn();
        const addCost = jest.fn();
        const { getByText } = render(
            <PizzaPopup product={product} addProductToCart={addProductToCart} modalClose={modalClose} addCost={addCost} />
        );

        expect(getByText('Добавить в корзину за 249₽')).toBeInTheDocument();
        expect(getByText('Пепперони')).toBeInTheDocument();

        userEvent.click(getByText('Ветчина'));
        expect(getByText('Добавить в корзину за 328₽')).toBeInTheDocument();
    });

    it('add type of pizza and check total price', () => {
        const addProductToCart = jest.fn();
        const modalClose = jest.fn();
        const addCost = jest.fn();
        const { getByText } = render(
            <PizzaPopup product={product} addProductToCart={addProductToCart} modalClose={modalClose} addCost={addCost} />
        );

        expect(getByText('Добавить в корзину за 249₽')).toBeInTheDocument();
        expect(getByText('Пепперони')).toBeInTheDocument();

        userEvent.click(getByText('Средняя'));
        expect(getByText('Добавить в корзину за 499₽')).toBeInTheDocument();
    });
});
