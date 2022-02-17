import { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import PizzaList from '../../components/PizzaList/PizzaList';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { DispatchThunk, RootState } from '../../store';
import { getCurrentPizza, getFetchingPizza, onFetchPizza } from '../../store/pizza';
import { openModal, setType } from '../../store/modal';
import { PizzaModel } from '../../api/models';
import { setProduct } from '../../store/app';

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
    }),
    (dispatch: DispatchThunk) => ({
        fetchPizza: () => {
            dispatch(onFetchPizza());
        },
        modalOpen: () => {
            dispatch(openModal());
        },
        setBodyPopup: (body: string) => {
            dispatch(setType(body));
        },
        setProductToPopup: (product: PizzaModel) => {
            dispatch(setProduct(product))
        }
    })
);

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
type PropsFromRedux = GetProps<typeof Connector>;

const HomePage: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { pizza, fetchPizza, fetchingPizza, modalOpen, setBodyPopup, setProductToPopup } = props;

    useEffect(() => {
        fetchPizza();
    }, []);

    if (fetchingPizza) {
        return <CircularProgress color="warning" sx={styledSpinner} />;
    }

    return (
        <Container>
            <PizzaList pizza={pizza} modalOpen={modalOpen} setBodyPopup={setBodyPopup} setProductToPopup={setProductToPopup} />
        </Container>
    );
});

export default HomePage;
