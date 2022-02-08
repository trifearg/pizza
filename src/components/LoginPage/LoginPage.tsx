import { FunctionComponent } from "react";
import styled from 'styled-components'
import logo from "../../assets/logo.png"
import { FormControl, Button, TextField } from "@mui/material"

const styleButtons = {
    margin: 5
}

const FormStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
`

const LoginPage: FunctionComponent = () => {
    return (
        <>
            <FormStyled>
                <img src={logo} alt="dodo" width={250} />
                <FormControl>
                    <TextField style={styleButtons} id="outlined-basic" label="Логин" variant="outlined" color="warning"/>
                    <TextField style={styleButtons} id="outlined-basic" label="Пароль" variant="outlined" color="warning"/>
                    <Button style={styleButtons} variant="contained" color="warning">Войти</Button>
                    <Button style={styleButtons} variant="contained" color="warning">Регистрация</Button>
                </FormControl>
            </FormStyled>
        </>
    );
}

export default LoginPage;