import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cities from './Cities';

describe('testing Cities', () => {
    it('render component', () => {
        const modalClose = jest.fn();
        const updateCurrentCity = jest.fn();
        const { getByText } = render(<Cities modalClose={modalClose} updateCurrentCity={updateCurrentCity} />);

        expect(getByText('Москва')).toBeInTheDocument();
        expect(getByText('Самара')).toBeInTheDocument();
        expect(getByText('Закрыть')).toBeInTheDocument();
    });

    it('filtered cities', () => {
        const modalClose = jest.fn();
        const updateCurrentCity = jest.fn();
        const { getByText, getByPlaceholderText, queryByText } = render(
            <Cities modalClose={modalClose} updateCurrentCity={updateCurrentCity} />
        );

        expect(getByText('Москва')).toBeInTheDocument();
        expect(getByText('Самара')).toBeInTheDocument();

        userEvent.type(getByPlaceholderText('Введите город'), 'Москва');

        expect(getByText('Москва')).toBeInTheDocument();
        expect(queryByText('Самара')).not.toBeInTheDocument();
    });
});
