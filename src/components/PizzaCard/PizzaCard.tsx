import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { PizzaModel } from '../../api/models';

interface IProps extends PizzaModel {
    modalOpen: () => void;
    setBodyPopup: (body: string) => void;
    setProductToPopup: (product: PizzaModel) => void;
}

const PizzaCard: FunctionComponent<IProps> = ({
    id,
    name,
    photo,
    description,
    price,
    modalOpen,
    setBodyPopup,
    setProductToPopup,
}) => {
    const openPizzaModel = () => {
        const pizzaModel = {
            id: id,
            name: name,
            photo: photo,
            price: price,
        };
        setProductToPopup(pizzaModel);
        setBodyPopup('pizzaModel');
        modalOpen();
    };

    return (
        <Card sx={{ maxWidth: 300, margin: '10px 10px 20px' }} onClick={() => openPizzaModel()}>
            <CardActionArea sx={{ height: 490 }}>
                <CardMedia component="img" height="300" image={photo} alt="pizza" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ height: 100 }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'space-between', marginLeft: 2 }}>
                <Typography variant="h5" gutterBottom component="div">
                    {price}
                </Typography>
                <Button variant="outlined" size="small" color="warning">
                    Добавить
                </Button>
            </CardActions>
        </Card>
    );
};

export default PizzaCard;
