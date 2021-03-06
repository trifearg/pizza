import { Box, Grid, Stack, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { ChangeEvent, FunctionComponent, useCallback, useState } from 'react';
import { PizzaModel } from '../../api/models';
import { v4 as uuid } from 'uuid';
import { ingredients, Ingredient } from '../../api/models/ingredient.model'

interface IProps {
    product: PizzaModel;
    addProductToCart: (product: PizzaModel) => void;
    modalClose: () => void,
    addCost: (price: number) => void 
}

const PizzaPopup: FunctionComponent<IProps> = ({ product, addProductToCart, modalClose, addCost }) => {
    const typesOfPizza = [
        {
            name: 'Маленькая',
            price: product.price,
        },
        {
            name: 'Средняя',
            price: product.price + 250,
        },
        {
            name: 'Большая',
            price: product.price + 400,
        },
    ];
    const { name, id, price, photo } = product;
    const [currentPrice, setCurrentPrice] = useState<number>(price);
    const [currentIngredients, setCurrentIngredients] = useState<Ingredient[]>(ingredients);
    const [ingredientsPizzaAdded, setIngredientsPizzaAdded] = useState<Ingredient[]>([]);
    const [typePizzaAdded, setTypePizzaAdded] = useState<string>(typesOfPizza[0].name);
    const [currentPriceType, setCurrentPriceType] = useState<number>(typesOfPizza[0].price);

    const addGradient = (ingredient: Ingredient) => {
        if (!ingredient.added) {
            setIngredientsPizzaAdded([...ingredientsPizzaAdded, ingredient]);
            setCurrentPrice((prev) => prev + ingredient.price);
        } else {
            setIngredientsPizzaAdded((prev) => prev.filter((item) => item.name !== ingredient.name));
            setCurrentPrice((prev) => prev - ingredient.price);
        }
        setCurrentIngredients(
            currentIngredients.map((item) => (item === ingredient ? { ...item, added: !ingredient.added } : item))
        );
    };

    const addTypeOfPizza = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCurrentPriceType(+e.target.value);
        if (ingredientsPizzaAdded.length) {
            setCurrentPrice(ingredientsPizzaAdded.reduce((acc, value) => acc + value.price, +e.target.value));
        } else {
            setCurrentPrice(+e.target.value);
        }
    }, [ingredientsPizzaAdded]);

    const addProduct = () => {
        const uniqueIdProduct = uuid();
        const newProduct = {
            id: id + uniqueIdProduct,
            name: name,
            photo: photo,
            price: currentPrice,
            ingredients: ingredientsPizzaAdded,
            pizzaType: typePizzaAdded,
        };
        addProductToCart(newProduct);
        addCost(newProduct.price);
        modalClose();
    };

    return (
        <>
            <Box sx={{ width: 900, height: 405 }}>
                <Stack direction="row" spacing={1} sx={{ margin: 5 }}>
                    <img src={photo} alt="pizza model" width="350px" height="350px" />
                    <Stack direction="column" spacing={2} sx={{ height: 350, overflowY: 'scroll' }}>
                        <Typography variant="h4" sx={{fontWeight: "bold"}} mt={2}>
                            {name}
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                row
                                value={currentPriceType}
                                onChange={addTypeOfPizza}
                                defaultValue={currentPriceType}
                            >
                                {typesOfPizza.map((item, index) => (
                                    <FormControlLabel
                                        value={item.price}
                                        key={`toggleButton:${index}`}
                                        control={<Radio color="warning" />}
                                        label={item.name}
                                        onClick={() => setTypePizzaAdded(item.name)}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Typography variant="h6" mt={2}>
                            Добавить в пиццу
                        </Typography>
                        <Grid container data-testid='grid-ingredients'>
                            {currentIngredients.map((item, index) => (
                                <Grid item sx={{ marginTop: 1 }} key={`ingredient:${index}`} xs={4}>
                                    <Button
                                        onClick={() => addGradient(item)}
                                        color="inherit"
                                        sx={{
                                            border: item.added ? '1px solid #ed6c02' : '',
                                            width: 115,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: 5,
                                        }}
                                    >
                                        <img src={item.photo} alt="ingredient" width="80px" height="80px" />
                                        <Typography align="center" variant="body2" sx={{ height: 40 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography align="center" variant="subtitle1">
                                            {item.price}₽
                                        </Typography>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 5, marginTop: 1, marginBottom: 1 }}>
                <Button color="warning" variant="contained" onClick={() => addProduct()} data-testid='add-pizza'>
                    Добавить в корзину за {currentPrice}₽
                </Button>
            </Box>
        </>
    );
};

export default PizzaPopup;
