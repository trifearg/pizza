import { renderWithRedux } from '../../helpers/renderWithRedux';
import HomePage from './HomePage';
import { defaultPizza } from '../../api/models';

describe('HomePage', () => {
    it('show pizza', () => {
        const { getByText } = renderWithRedux(<HomePage />, {
            initialState: {
                pizza: {
                    fetchingPizza: false,
                    fetchingPizzaError: '',
                    pizza: defaultPizza,
                },
            },
        });
        expect(getByText('Пепперони')).toBeInTheDocument();
    });

    it('show loading spinner', () => {
        const { getByTestId,  } = renderWithRedux(<HomePage />, {
            initialState: {
                pizza: {
                    fetchingPizza: true,
                    fetchingPizzaError: '',
                    pizza: [],
                },
            },
        });
        expect(getByTestId('spinner')).toBeInTheDocument();
    });

    it('show error', () => {
        const { getByText } = renderWithRedux(<HomePage />, {
            initialState: {
                pizza: {
                    fetchingPizza: false,
                    fetchingPizzaError: 'Ошибка получения данных',
                    pizza: [],
                },
            },
        });
        expect(getByText('Ошибка получения данных')).toBeInTheDocument();
    });
});
