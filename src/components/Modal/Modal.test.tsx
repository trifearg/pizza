import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cities from '../Cities/Cities';
import PizzaPopup from '../PizzaPopup/PizzaPopup';
import Modal from './Modal';

describe('city selector', () => {
    it('show city selector with close button', () => {
        const isOpen = true;
        const modalClose = jest.fn();
        const updateCurrentCity = jest.fn();
        render(
            <Modal isOpen={isOpen} modalClose={modalClose}>
                <Cities modalClose={modalClose} updateCurrentCity={updateCurrentCity} />
            </Modal>
        );
    
        expect(screen.getByPlaceholderText('Введите город')).toBeInTheDocument();
        expect(screen.getByTestId('grid-cities')).toBeInTheDocument();
    
        userEvent.click(screen.getByTestId('close-cities-selector'));
        expect(modalClose).toHaveBeenCalledTimes(1);
    })
})

const product = {
    id: 0,
    name: 'Пепперони',
    photo: 'https://dodopizza-a.akamaihd.net/static/Img/Products/eb6d128bbcd340e98fd4f14b377e769f_292x292.jpeg',
    price: 249,
};

describe('pizza popup', () => {
    it('show pizza popup with add pizza button', () => {
        const isOpen = true;
        const modalClose = jest.fn();
        const addProductToCart = jest.fn();
        const addCost = jest.fn();
    
        render(
            <Modal isOpen={isOpen} modalClose={modalClose}>
                <PizzaPopup modalClose={modalClose} addProductToCart={addProductToCart} addCost={addCost} product={product} />
            </Modal>
        );
    
        expect(screen.getByText('Пепперони')).toBeInTheDocument();
        expect(screen.getByLabelText('Маленькая')).toBeInTheDocument();
        expect(screen.getByLabelText('Средняя')).toBeInTheDocument();
        expect(screen.getByLabelText('Большая')).toBeInTheDocument();
        expect(screen.getByText('Добавить в пиццу')).toBeInTheDocument();
    
        expect(screen.getByTestId('grid-ingredients')).toBeInTheDocument();
    
        userEvent.click(screen.getByTestId('add-pizza'));
        expect(modalClose).toHaveBeenCalledTimes(1);
    })
})

