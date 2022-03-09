import { FunctionComponent, useEffect, useState } from 'react';
import { Box, Grid, Input, Button } from '@mui/material';

interface IProps {
    modalClose: () => void;
    updateCurrentCity: (city: string) => void;
}

const cities = [
    'Москва',
    'Санкт-Петербург',
    'Самара',
    'Казань',
    'Калининград',
    'Ульяновск',
    'Таганрог',
    'Тверь',
    'Оренбург',
    'Сочи',
];

const Cities: FunctionComponent<IProps> = ({ modalClose, updateCurrentCity }) => {
    const [searchItem, setSearchItem] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    useEffect(() => {
        const results = cities.filter((item) => item.toLowerCase().includes(searchItem.toLowerCase()));
        setSearchResults(results);
    }, [searchItem]);

    const searchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value);
    };

    const handleChangeCity = (city: string) => {
        updateCurrentCity(city);
        modalClose();
    };

    return (
        <Box
            sx={{
                width: 500,
                height: 200,
                margin: 5,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Input placeholder="Введите город" color="warning" sx={{ marginBottom: 5 }} onChange={searchCity} />
            <Grid container spacing={2} data-testid="grid-cities">
                {searchResults.map((elem, index) => (
                    <Grid xs key={`city:${index}`} item>
                        <Button color="inherit" size="small" onClick={() => handleChangeCity(elem)}>
                            {elem}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 3, marginTop: 3 }} onClick={modalClose}>
                <Button color="warning" data-testid="close-cities-selector">
                    Закрыть
                </Button>
            </Box>
        </Box>
    );
};

export default Cities;
