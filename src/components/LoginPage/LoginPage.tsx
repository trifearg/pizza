import { FunctionComponent, useState } from "react";
import styled from 'styled-components'
import { Button, TextField, Alert, Snackbar } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store';
import { authorization } from "../../store/currentUser/currentUser.action";
import { Navigate, useLocation } from "react-router-dom";

const styleButtons = {
    margin: 5
}

const FormStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 250px;
`

const LoginPage: FunctionComponent = () => {
    const user = useSelector((state: RootState) => state.currentUser);
    const dispatch = useDispatch();
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
        dispatch(authorization(login, password));
    }

    if (user.isLogin) {
        return <Navigate to="/account" state={{ from: location }} replace />
    }

    return (
        <>
            <FormStyled>
                <TextField
                    style={styleButtons}
                    label="Логин"
                    variant="outlined"
                    color="warning"
                    onChange={userLogin}
                />
                <TextField
                    style={styleButtons}
                    label="Пароль"
                    variant="outlined"
                    color="warning"
                    type="password"
                    onChange={userPassword}
                />
                <Button
                    style={styleButtons}
                    variant="contained"
                    color="warning"
                    onClick={logIn}>
                    Войти
                </Button>
            </FormStyled>
            <Snackbar open={user.error ? true : false} autoHideDuration={3000} >
                <Alert variant="outlined" severity="error" >
                    {user.error}
                </Alert>
            </Snackbar>
        </>
    );
}

export default LoginPage;