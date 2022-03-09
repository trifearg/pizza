import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';
import PizzaList from '../../components/PizzaList/PizzaList';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { DispatchThunk, RootState } from '../../store';
import { getCurrentPizza, getFetchingPizza, getFetchingPizzaError, pizzaActions } from '../../store/pizza';
import { PizzaModel } from '../../api/models';
import { modalActions } from '../../store/modal';
import { appActions } from '../../store/app';

const styledSpinner = {
    position: 'fixed',
    top: '50%',
    left: '50%',
};

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
`;

const Connector = connect(
    (state: RootState) => ({
        pizza: getCurrentPizza(state),
        fetchingPizza: getFetchingPizza(state),
        fetchingPizzaError: getFetchingPizzaError(state),
    }),
    (dispatch: DispatchThunk) => ({
        fetchPizza: () => {
            dispatch(pizzaActions.onFetchPizza());
        },
        modalOpen: () => {
            dispatch(modalActions.openModal());
        },
        setBodyPopup: (body: string) => {
            dispatch(modalActions.setType(body));
        },
        setProductToPopup: (product: PizzaModel) => {
            dispatch(appActions.setProduct(product));
        },
    })
);

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
type PropsFromRedux = GetProps<typeof Connector>;

const HomePage: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { pizza, fetchPizza, fetchingPizza, fetchingPizzaError, modalOpen, setBodyPopup, setProductToPopup } = props;

    useEffect(() => {
        fetchPizza();
    }, []);

    if (fetchingPizza) {
        return <CircularProgress color="warning" sx={styledSpinner} data-testid={'spinner'} />;
    }

    return (
        <Container>
            {fetchingPizzaError ? (
                <Typography variant="h4">{fetchingPizzaError}</Typography>
            ) : (
                <PizzaList
                    pizza={pizza}
                    modalOpen={modalOpen}
                    setBodyPopup={setBodyPopup}
                    setProductToPopup={setProductToPopup}
                />
            )}
        </Container>
    );
});

HomePage.displayName = 'HomePage';
export default HomePage;
