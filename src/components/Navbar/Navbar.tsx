import { FunctionComponent, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../assets/logo_navbar.png"
import { Link, useNavigate } from "react-router-dom";
import Modal from '../Modal/Modal'
import Cities from "../Cities/Cities";
import { Connector, PropsFromRedux } from "../../store/connector/Connector";

const styleBox = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
}

const styleAppBar = {
    position: "fixed",
    left: 0,
    margin: "0 auto",
    bgcolor: '#ed6c02',
    color: 'black',
    width: 1280
}

const Navbar: FunctionComponent = Connector((props: PropsFromRedux) => {
    const { currentCity, logoutCurrentUser, currentUserIsLogin, modalOpen } = props;
    const navigate = useNavigate();

    const transitionToAccount = () => {
        navigate("/account");
    }

    const transitionToLogin = () => {
        navigate("/login");
    }

    const open = () => {
        modalOpen();
    }

    const logOut = () => {
        logoutCurrentUser();
    }

    return (
        <Box sx={styleBox}>
            <AppBar sx={styleAppBar}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/"><img src={logo} alt="logo" width={45} /></Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                        DemoDodo
                    </Typography>
                    <Button color="inherit" onClick={open}>
                        {currentCity}
                    </Button>
                    {
                        !currentUserIsLogin ?
                            <Button color="inherit" onClick={transitionToLogin}>Войти</Button> :
                            <ButtonGroup variant="text" color="warning">
                                <Button color="inherit" onClick={transitionToAccount}>Личный кабинет</Button>
                                <Button color="inherit" onClick={logOut}>Выйти</Button>
                            </ButtonGroup>
                    }
                </Toolbar>
            </AppBar>
            <Modal>
                <Cities/>
            </Modal>
        </Box>
    );
})

export default Navbar;