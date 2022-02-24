import { FunctionComponent, useState } from 'react';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import ErrorBoundary from '../../components/AlertError/ErrorBoundary';
import FictionalError from '../../components/AlertError/FictionalError';
import LoginForm from '../../components/LoginForm/LoginForm';
import { DispatchThunk, RootState } from '../../store';
import { appActions, error, isLogin } from '../../store/app';

const Connector = connect(
    (state: RootState) => ({
        currentUserIsLogin: isLogin(state),
        currentUserError: error(state),
    }),
    (dispatch: DispatchThunk) => ({
        authorizationCurrentUser: (login: string, password: string) => {
            dispatch(appActions.authorization(login, password));
        },
    })
);

type GetProps<C> = C extends InferableComponentEnhancerWithProps<infer P, {}> ? P : never;
type PropsFromRedux = GetProps<typeof Connector>;

const LoginPage: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { authorizationCurrentUser, currentUserIsLogin, currentUserError } = props;
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const location = useLocation();

    const userLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };

    const userPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const logIn = () => {
        authorizationCurrentUser(login, password);
    };

    if (currentUserIsLogin) {
        return <Navigate to="/account" state={{ from: location }} replace />;
    }

    return (
        <>
            <LoginForm userLogin={userLogin} userPassword={userPassword} logIn={logIn} error={currentUserError} />
            <ErrorBoundary>
                <FictionalError login={login} />
            </ErrorBoundary>
        </>
    );
});

LoginPage.displayName = 'LoginPage';
export default LoginPage;
