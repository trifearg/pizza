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

const AppStyled = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100%
  }
`;

export const Connector = connect(
    (state: RootState) => ({
        currentUserIsLogin: isLogin(state),
        currentUserError: error(state),
        currentCity: getCurrentCity(state),
        isOpen: modalIsOpen(state),
        bodyPopup: modalType(state),
        product: getCurrentProduct(state)
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
    })
);

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
type PropsFromRedux = GetProps<typeof Connector>;

const App: FunctionComponent = Connector((props: PropsFromRedux) => {
    const {
        isOpen,
        modalClose,
        currentCity,
        logoutCurrentUser,
        currentUserIsLogin,
        modalOpen,
        updateCurrentCity,
        setBodyPopup,
        bodyPopup,
        product
    } = props;

    return (
        <>
            <AppStyled />
            <Navbar
                currentCity={currentCity}
                logoutCurrentUser={logoutCurrentUser}
                currentUserIsLogin={currentUserIsLogin}
                modalOpen={modalOpen}
                setBodyPopup={setBodyPopup}
            />
            <Routing />
            {bodyPopup === 'cities' ? (
                <Modal modalClose={modalClose} isOpen={isOpen}>
                    <Cities updateCurrentCity={updateCurrentCity} modalClose={modalClose} />
                </Modal>
            ) : null}
            {bodyPopup === 'pizzaModel' ? (
                <Modal modalClose={modalClose} isOpen={isOpen}>
                    <PizzaPopup product={product} />
                </Modal>
            ) : null}
        </>
    );
});

export default App;
