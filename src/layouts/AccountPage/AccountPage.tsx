import { FunctionComponent } from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store';
import { isLogin } from '../../store/app';


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Connector = connect((state: RootState) => ({
    currentUserIsLogin: isLogin(state),
}));

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
export type PropsFromRedux = GetProps<typeof Connector>;

const AccountPage: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { currentUserIsLogin } = props;
    const location = useLocation();

    if (!currentUserIsLogin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Container>
            <h1>My account</h1>
        </Container>
    );
});

AccountPage.displayName = 'AccountPage';
export default AccountPage;
