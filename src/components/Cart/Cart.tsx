import { Box, Button, Card, CardActions, CardContent, Drawer, Typography } from '@mui/material';
import { Component } from 'react';
import { PizzaModel } from '../../api/models';
import CartPizzaList from '../CartPizzaList/CartPizzaList';
import logo from '../../assets/cart_empty.svg';

interface IProps {
    cart: PizzaModel[];
    isOpenCart: boolean;
    cartClose: () => void;
    deleteProductFromCart: (id: string | number) => void;
    totalCost: number;
    subtractCost: (price: number) => void;
}

class Cart extends Component<IProps, {}> {

    render() {
        return (
            <Drawer anchor="right" open={this.props.isOpenCart} onClose={this.props.cartClose}>
                <Box>
                    {!this.props.cart.length ? (
                        <Box
                            sx={{
                                margin: 5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <img src={logo} width="400" height="400" alt="cart empty" />
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Ваша корзина пуста!
                            </Typography>
                            <Typography variant="body1">
                                Выберите конкретную пиццу на главной странице и оформите заказ.
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100vh',
                            }}
                        >
                            <Box>
                                <CartPizzaList cart={this.props.cart} deleteProductFromCart={this.props.deleteProductFromCart} subtractCost={this.props.subtractCost} />
                            </Box>
                            <Box>
                                <Card raised={true} sx={{ margin: 1, padding: 1 }}>
                                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h5" component="div">
                                            Сумма заказа:{' '}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {this.props.totalCost}₽
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth variant="contained" color="warning">
                                            Перейти к оформлению
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Drawer>
        );
    }
}

export default Cart;
