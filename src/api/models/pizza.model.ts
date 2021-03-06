import { Ingredient } from './ingredient.model'

export interface PizzaModel {
    id: number | string,
    name: string,
    photo: string,
    description?: string,
    price: number,
    ingredients?: Ingredient[],
    pizzaType?: string
}

export const defaultPizza: PizzaModel[] = [
    {
        id: 1,
        name: "Пепперони",
        photo: "https://dodopizza-a.akamaihd.net/static/Img/Products/eb6d128bbcd340e98fd4f14b377e769f_292x292.jpeg",
        description: "Пикантная пепперони, увеличенная порция моцареллы, томаты, томатный соус",
        price: 249
    },
    {
        id: 2,
        name: "Додо Микс",
        photo: "https://dodopizza-a.akamaihd.net/static/Img/Products/9f4fe925ef56492c93eb1d95254ad29d_292x292.jpeg",
        description: "Бекон, цыпленок, ветчина, сыр блю чиз, сыры чеддер и пармезан, соус песто, кубики брынзы, томаты, красный лук, моцарелла, соус альфредо, чеснок, итальянские травы",
        price: 499
    },
    {
        id: 3,
        name: "Цыпленок ранч",
        photo: "https://dodopizza-a.akamaihd.net/static/Img/Products/d23af75498eb47a8a586313792da917f_292x292.jpeg",
        description: "Цыпленок, ветчина, соус ранч, моцарелла, томаты, чеснок",
        price: 449
    },
    {
        id: 4,
        name: "Додо",
        photo: "https://dodopizza-a.akamaihd.net/static/Img/Products/3e4065bbc610451f9441a9ced2426f23_292x292.jpeg",
        description: "Бекон, митболы, пикантная пепперони, моцарелла, томаты, шампиньоны, сладкий перец, красный лук, чеснок, томатный соус",
        price: 449
    },
    {
        id: 5,
        name: "Чизбургер-пицца",
        photo: "https://dodopizza-a.akamaihd.net/static/Img/Products/3bc057459afb4b2b8f2781bd1895b3a9_584x584.jpeg",
        description: "Мясной соус болоньезе, соус бургер, соленые огурчики, томаты, красный лук, моцарелла",
        price: 399
    }, 
    {
        id: 6,
        name: "Диабло",
        photo: "https://dodopizza-a.akamaihd.net/static/Img/Products/2ac448e39ba24623a33c1d8d50b69ef8_292x292.jpeg",
        description: "Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла, томатный соус",
        price: 449
    }
]