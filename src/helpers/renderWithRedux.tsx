import { Provider } from 'react-redux';
import { RootState } from '../store';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialStateApp } from '../store/app';
import { initialStateCart } from '../store/cart';
import { initialStateModal } from '../store/modal';
import { initialStatePizza } from '../store/pizza';
import { initialStateUsers } from '../store/users';
import { Store } from 'redux';

interface IProps extends RenderOptions {
    initialState: Partial<RootState>;
    store?: Store<Partial<RootState>>;
}

export const renderWithRedux = (
    component: React.ReactElement,
    { initialState, store = configureStore<Partial<RootState>>([thunk])(initialState), ...renderOptions }: IProps = {
        initialState: {
            app: initialStateApp,
            cart: initialStateCart,
            modal: initialStateModal,
            pizza: initialStatePizza,
            users: initialStateUsers,
        },
    }
) => {
    return rtlRender(component, {
        wrapper: TestWrapper(store),
        ...renderOptions,
    });
};

const TestWrapper =
    (store: Store) =>
    ({ children }: { children?: React.ReactNode }) =>
        (
                <Provider store={store}>{children}</Provider>
        );
