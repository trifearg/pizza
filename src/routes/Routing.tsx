import { FunctionComponent, lazy, Suspense } from 'react';
import AccountPage from '../layouts/AccountPage/AccountPage';
import LoginPage from '../layouts/LoginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';
import withLogging from '../components/HOC/withLogging';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { RootState } from '../store';
import { getCurrentUser } from '../store/app';

const HomePage = lazy(() => import('../layouts/HomePage/HomePage'));

export const Connector = connect((state: RootState) => ({
    currentUser: getCurrentUser(state),
}));

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
export type PropsFromRedux = GetProps<typeof Connector>;

const Routing: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { currentUser } = props;

    return (
        <Suspense fallback={<div></div>}>
            <Routes>
                <Route path="/" element={withLogging({ currentUser })(HomePage)} />
                <Route path="/account" element={withLogging({ currentUser })(AccountPage)} />
                <Route path="/login" element={withLogging({ currentUser })(LoginPage)} />
            </Routes>
        </Suspense>
    );
});

export default Routing;
