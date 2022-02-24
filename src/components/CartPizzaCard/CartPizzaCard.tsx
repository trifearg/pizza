import { Card, Stack, CardMedia, CardContent, Typography, Divider } from '@mui/material';
import { FunctionComponent } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ingredient } from '../../api/models/ingredient.model'

interface IProps {
    id: string | number;
    photo: string;
    name: string;
    pizzaType?: string;
    price: number;
    ingredients?: Ingredient[];
    deleteProductFromCart: (id: string | number) => void;
    subtractCost: (price: number) => void; 
}

const CartPizzaCard: FunctionComponent<IProps> = ({
    id,
    photo,
    name,
    pizzaType,
    price,
    ingredients,
    deleteProductFromCart,
    subtractCost
}) => {

    const deleteFromCart = () => {
        deleteProductFromCart(id);
        subtractCost(price);
    }

    return (
        <>
            <Card raised={true} sx={{ width: 400, margin: 1, padding: 1 }}>
                <Stack direction="row">
                    <CardMedia component="img" sx={{ width: 100, height: 100 }} image={photo} alt="pizza" />
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {name}
                        </Typography>
                        <Typography variant="body1">
                            {pizzaType}
                            <br></br>
                            {ingredients?.length
                                ? '+ ' + ingredients?.map((ingredient) => ` ${ingredient.name.toLowerCase()}`)
                                : ''}
                        </Typography>
                    </CardContent>
                </Stack>
                <Divider light />
                <Stack direction="row" sx={{ marginLeft: 3, flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                        {price}₽
                    </Typography>
                    <IconButton onClick={deleteFromCart} size="large">
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Card>
        </>
    );
};

export default CartPizzaCard;
