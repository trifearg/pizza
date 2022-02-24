export interface Ingredient {
    name: string;
    price: number;
    photo?: string;
    added?: boolean;
}

export const ingredients: Ingredient[] = [
    {
        name: 'Острый халапеньо',
        price: 79,
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA5E376B4DF',
        added: false,
    },
    {
        name: 'Ветчина',
        price: 79,
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
        added: false,
    },
    {
        name: 'Томаты',
        price: 79,
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
        added: false,
    },
    {
        name: 'Сладкий перец',
        price: 79,
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
        added: false,
    },
    {
        name: 'Бекон',
        price: 79,
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
        added: false,
    },
    {
        name: 'Красный лук',
        price: 79,
        photo: 'https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
        added: false,
    },
];