import { FunctionComponent } from 'react';
import { Button, TextField, Alert, Snackbar } from '@mui/material';
import styled from 'styled-components';

interface IProps {
    userLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    userPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    logIn: () => void;
    error: string;
}

const styleButtons = {
    margin: 5,
};

const WrapperFormStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
`;

const FormStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const LoginForm: FunctionComponent<IProps> = ({ userLogin, userPassword, logIn, error }) => {
    return (
        <WrapperFormStyled>
            <FormStyled>
                <TextField style={styleButtons} label="Логин" variant="outlined" color="warning" onChange={userLogin} />
                <TextField
                    style={styleButtons}
                    label="Пароль"
                    variant="outlined"
                    color="warning"
                    type="password"
                    onChange={userPassword}
                />
                <Button style={styleButtons} variant="contained" color="warning" onClick={logIn}>
                    Войти
                </Button>
            </FormStyled>
            <Snackbar open={error ? true : false}>
                <Alert variant="outlined" severity="error" data-testid='error'>
                    {error}
                </Alert>
            </Snackbar>
        </WrapperFormStyled>
    );
};

export default LoginForm;
