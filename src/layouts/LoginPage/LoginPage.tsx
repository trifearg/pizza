import { FunctionComponent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Connector, PropsFromRedux } from '../../store/connector/Connector';

const LoginPage: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { authorizationCurrentUser, currentUserIsLogin, currentUserError } = props;
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const location = useLocation();

    const userLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }

    const userPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const logIn = () => {
        authorizationCurrentUser(login, password);
    }

    if (currentUserIsLogin) {
        return <Navigate to="/account" state={{ from: location }} replace />
    }

    return (
        <LoginForm
            userLogin={userLogin}
            userPassword={userPassword}
            logIn={logIn}
            error={currentUserError}
        />
    );
})

export default LoginPage;