import { FunctionComponent } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { createGlobalStyle } from 'styled-components';
import Routing from '../routes/Routing';
import Modal from '../components/Modal/Modal';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { DispatchThunk, RootState } from '../store';
import { closeModal, modalIsOpen, modalType, openModal, setType } from '../store/modal';
import { error, exit, getCurrentCity, getCurrentProduct, isLogin, updateCity } from '../store/app';
import Cities from '../components/Cities/Cities';
import PizzaPopup from '../components/PizzaPopup/PizzaPopup';
import {
    addProduct,
    addTotalCost,
    cartIsOpen,
    closeDrawer,
    deleteProduct,
    getCurrentCart,
    getTotalCost,
    openDrawer,
    subtractTotalCost,
} from '../store/cart';
import { PizzaModel } from '../api/models';
import Cart from '../components/Cart/Cart';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import '../index.css'

const AppStyled = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100%
  }
`;

const theme = createTheme({
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
    },
});

export const Connector = connect(
    (state: RootState) => ({
        currentUserIsLogin: isLogin(state),
        currentUserError: error(state),
        currentCity: getCurrentCity(state),
        isOpenModal: modalIsOpen(state),
        bodyPopup: modalType(state),
        product: getCurrentProduct(state),
        cart: getCurrentCart(state),
        isOpenCart: cartIsOpen(state),
        totalCost: getTotalCost(state),
    }),
    (dispatch: DispatchThunk) => ({
        updateCurrentCity: (city: string) => {
            dispatch(updateCity(city));
        },
        logoutCurrentUser: () => {
            dispatch(exit());
        },
        modalOpen: () => {
            dispatch(openModal());
        },
        modalClose: () => {
            dispatch(closeModal());
        },
        setBodyPopup: (body: string) => {
            dispatch(setType(body));
        },
        cartOpen: () => {
            dispatch(openDrawer());
        },
        cartClose: () => {
            dispatch(closeDrawer());
        },
        addProductToCart: (product: PizzaModel) => {
            dispatch(addProduct(product));
        },
        deleteProductFromCart: (id: string | number) => {
            dispatch(deleteProduct(id));
        },
        subtractCost: (price: number) => {
            dispatch(subtractTotalCost(price));
        },
        addCost: (price: number) => {
            dispatch(addTotalCost(price));
        },
    })
);

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
type PropsFromRedux = GetProps<typeof Connector>;

const App: FunctionComponent = Connector((props: PropsFromRedux) => {
    const {
        isOpenModal,
        modalClose,
        currentCity,
        logoutCurrentUser,
        currentUserIsLogin,
        modalOpen,
        updateCurrentCity,
        setBodyPopup,
        bodyPopup,
        product,
        cart,
        isOpenCart,
        cartClose,
        cartOpen,
        addProductToCart,
        deleteProductFromCart,
        addCost,
        subtractCost,
        totalCost,
    } = props;

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppStyled />
                <Navbar
                    currentCity={currentCity}
                    logoutCurrentUser={logoutCurrentUser}
                    currentUserIsLogin={currentUserIsLogin}
                    modalOpen={modalOpen}
                    setBodyPopup={setBodyPopup}
                    cartOpen={cartOpen}
                />
                <Routing />
                {bodyPopup === 'cities' ? (
                    <Modal modalClose={modalClose} isOpen={isOpenModal}>
                        <Cities updateCurrentCity={updateCurrentCity} modalClose={modalClose} />
                    </Modal>
                ) : null}
                {bodyPopup === 'pizzaModel' ? (
                    <Modal modalClose={modalClose} isOpen={isOpenModal}>
                        <PizzaPopup
                            product={product}
                            addProductToCart={addProductToCart}
                            modalClose={modalClose}
                            addCost={addCost}
                        />
                    </Modal>
                ) : null}
                <Cart
                    cart={cart}
                    isOpenCart={isOpenCart}
                    cartClose={cartClose}
                    deleteProductFromCart={deleteProductFromCart}
                    totalCost={totalCost}
                    subtractCost={subtractCost}
                />
            </ThemeProvider>
        </>
    );
});

export default App;
