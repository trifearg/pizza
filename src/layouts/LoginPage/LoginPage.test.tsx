import { renderWithRedux } from '../../helpers/renderWithRedux';
import { MemoryRouter } from 'react-router-dom';
import Routing from '../../routes/Routing';

describe('LoginPage', () => {
    it('testing isLogin true', () => {
        const { getByText } = renderWithRedux(
            <MemoryRouter initialEntries={['/login']}>
                <Routing />
            </MemoryRouter>,
            {
                initialState: {
                    app: {
                        city: 'Москва',
                        error: '',
                        isLogin: true,
                        user: {
                            id: 0,
                            login: 'pasha',
                            name: 'pasha',
                            password: 'qwerty',
                            role: 0,
                        },
                        product: {
                            id: 0,
                            name: '',
                            photo: '',
                            price: 0,
                        },
                    },
                },
            }
        );
        expect(getByText('My account')).toBeInTheDocument();
    });

    it('testing isLogin false', () => {
        const { getByLabelText, getByText  } = renderWithRedux(
            <MemoryRouter initialEntries={['/login']}>
                <Routing />
            </MemoryRouter>,
            {
                initialState: {
                    app: {
                        city: 'Москва',
                        error: '',
                        isLogin: false,
                        user: {
                            id: 0,
                            login: 'pasha',
                            name: 'pasha',
                            password: 'qwerty',
                            role: 0,
                        },
                        product: {
                            id: 0,
                            name: '',
                            photo: '',
                            price: 0,
                        },
                    },
                },
            }
        );
        expect(getByLabelText('Логин')).toBeInTheDocument();
        expect(getByLabelText('Пароль')).toBeInTheDocument();
        expect(getByText('Войти')).toBeInTheDocument();
    });
});
