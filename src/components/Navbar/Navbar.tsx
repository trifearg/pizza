import { FunctionComponent } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../assets/logo_navbar.png"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { exit } from "../../store/currentUser/currentUser.action";

const styleBox = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
}

const styleAppBar = {
    bgcolor: '#ed6c02',
    color: 'black',
    width: 1280
}

const Navbar: FunctionComponent = () => {
    const user = useSelector((state: RootState) => state.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const transitionToAccount = () => {
        navigate("/account");
    }

    const transitionToLogin = () => {
        navigate("/login");
    }

    const logOut = () => {
        dispatch(exit());
    }

    return (
        <Box sx={styleBox}>
            <AppBar sx={styleAppBar} position="static">
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
                    {!user.isLogin ?
                        <Button color="inherit" onClick={transitionToLogin}>Войти</Button> :
                        <ButtonGroup variant="text" color="warning" aria-label="text button group">
                            <Button color="inherit" onClick={transitionToAccount}>Личный кабинет</Button>
                            <Button color="inherit" onClick={logOut}>Выйти</Button>
                        </ButtonGroup>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar;