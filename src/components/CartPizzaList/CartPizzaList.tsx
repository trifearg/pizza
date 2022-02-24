import { FunctionComponent } from 'react';
import { PizzaModel } from '../../api/models';
import CartPizzaCard from '../CartPizzaCard/CartPizzaCard';

interface IProps {
    cart: PizzaModel[];
    deleteProductFromCart: (id: string | number) => void;
    subtractCost: (price: number) => void; 
}

const CartPizzaList: FunctionComponent<IProps> = ({ cart, deleteProductFromCart, subtractCost }) => {
    return (
        <>
            {cart.map((item) => (
                <CartPizzaCard
                    key={item.id}
                    {...item}
                    deleteProductFromCart={deleteProductFromCart}
                    subtractCost={subtractCost}
                />
            ))}
        </>
    );
};

export default CartPizzaList;
