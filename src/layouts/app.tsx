import { FunctionComponent, useContext } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Routing from '../routes/Routing';
import Modal from '../components/Modal/Modal';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { DispatchThunk, RootState } from '../store';
import { modalActions, modalIsOpen, modalType } from '../store/modal';
import { appActions, error, getCurrentCity, getCurrentProduct, isLogin } from '../store/app';
import Cities from '../components/Cities/Cities';
import PizzaPopup from '../components/PizzaPopup/PizzaPopup';
import { cartActions, cartIsOpen, getCurrentCart, getTotalCost } from '../store/cart';
import { PizzaModel } from '../api/models';
import Cart from '../components/Cart/Cart';
import '../index.css';
import { createGlobalStyle } from 'styled-components';
import { ColorModeContext } from '../theme/ThemeContext';

const ThemeBody = createGlobalStyle`
    body {
        background-color: ${(props) => (props.theme ? '#212121' : 'white')} 
    }
`;

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
            dispatch(appActions.updateCity(city));
        },
        logoutCurrentUser: () => {
            dispatch(appActions.exit());
        },
        modalOpen: () => {
            dispatch(modalActions.openModal());
        },
        modalClose: () => {
            dispatch(modalActions.closeModal());
        },
        setBodyPopup: (body: string) => {
            dispatch(modalActions.setType(body));
        },
        cartOpen: () => {
            dispatch(cartActions.openDrawer());
        },
        cartClose: () => {
            dispatch(cartActions.closeDrawer());
        },
        addProductToCart: (product: PizzaModel) => {
            dispatch(cartActions.addProduct(product));
        },
        deleteProductFromCart: (id: string | number) => {
            dispatch(cartActions.deleteProduct(id));
        },
        subtractCost: (price: number) => {
            dispatch(cartActions.subtractTotalCost(price));
        },
        addCost: (price: number) => {
            dispatch(cartActions.addTotalCost(price));
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
    const colorTheme = useContext(ColorModeContext);

    return (
        <>
            <ThemeBody theme={colorTheme.modeTheme} />
            <Navbar
                currentCity={currentCity}
                logoutCurrentUser={logoutCurrentUser}
                currentUserIsLogin={currentUserIsLogin}
                modalOpen={modalOpen}
                setBodyPopup={setBodyPopup}
                cartOpen={cartOpen}
                cart={cart}
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
        </>
    );
});

export default App;
