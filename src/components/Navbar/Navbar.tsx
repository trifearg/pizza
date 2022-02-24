import { FunctionComponent, useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, ButtonGroup, Badge, Switch } from '@mui/material';
import logo from '../../assets/logo_navbar.png';
import { Link, useNavigate } from 'react-router-dom';
import { PizzaModel } from '../../api/models';
import { ColorModeContext } from '../../theme/ThemeContext';
import styled from 'styled-components';

const styleBox = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
};

const StyledAppBar = styled(AppBar)`
    position: fixed;
    left: 0;
    margin: 0 auto;
    background-color: ${(props) => (props.theme === true ? '#121212' : '#ed6c02')};
    color: ${(props) => (props.theme === true ? 'white' : '#121212')};
    width: 1280px;
`;

interface IProps {
    currentCity: string;
    logoutCurrentUser: () => void;
    currentUserIsLogin: boolean;
    modalOpen: () => void;
    setBodyPopup: (body: string) => void;
    cartOpen: () => void;
    cart: PizzaModel[];
}

const Navbar: FunctionComponent<IProps> = ({
    currentCity,
    logoutCurrentUser,
    currentUserIsLogin,
    modalOpen,
    setBodyPopup,
    cartOpen,
    cart,
}) => {
    const navigate = useNavigate();
    const colorTheme = useContext(ColorModeContext);

    const transitionToAccount = () => {
        navigate('/account');
    };

    const transitionToLogin = () => {
        navigate('/login');
    };

    const popupCities = () => {
        setBodyPopup('cities');
        modalOpen();
    };

    return (
        <Box sx={styleBox}>
            <StyledAppBar theme={colorTheme.modeTheme}>
                <Toolbar>
                    <Link to="/">
                        <img src={logo} alt="logo" width={45} />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                        DemoDodo
                    </Typography>
                    <Switch checked={colorTheme.modeTheme} onChange={colorTheme.toggleColorMode} color="default" />
                    <Button color="inherit" onClick={popupCities}>
                        {currentCity}
                    </Button>
                    <Badge
                        badgeContent={cart.length}
                        color="primary"
                        sx={{
                            '& .MuiBadge-badge': {
                                top: 2,
                                right: 4,
                                background: colorTheme.modeTheme ? 'white' : 'black',
                                color: '#ed6c02',
                            },
                        }}
                    >
                        <Button color="inherit" onClick={cartOpen}>
                            Корзина
                        </Button>
                    </Badge>
                    {!currentUserIsLogin ? (
                        <Button color="inherit" onClick={transitionToLogin}>
                            Войти
                        </Button>
                    ) : (
                        <ButtonGroup variant="text" color="warning">
                            <Button color="inherit" onClick={transitionToAccount}>
                                Кабинет
                            </Button>
                            <Button color="inherit" onClick={logoutCurrentUser}>
                                Выйти
                            </Button>
                        </ButtonGroup>
                    )}
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
};

export default Navbar;
