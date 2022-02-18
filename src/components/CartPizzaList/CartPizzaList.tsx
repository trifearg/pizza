import { FunctionComponent } from 'react';
import { PizzaModel } from '../../api/models';
import CartPizzaCard from '../CartPizzaCard/CartPizzaCard';

interface IProps {
    cart: Array<PizzaModel>;
    deleteProductFromCart: (id: string | number) => void;
    subtractCost: (price: number) => void; 
}

const CartPizzaList: FunctionComponent<IProps> = ({ cart, deleteProductFromCart, subtractCost }) => {
    return (
        <>
            {cart.map((item) => (
                <CartPizzaCard
                    key={item.id}
                    id={item.id}
                    photo={item.photo}
                    name={item.name}
                    pizzaType={item.pizzaType}
                    price={item.price}
                    ingredients={item.ingredients}
                    deleteProductFromCart={deleteProductFromCart}
                    subtractCost={subtractCost}
                />
            ))}
        </>
    );
};

export default CartPizzaList;
