import { RecipeDetailed } from './index.types';

const detailedRecipeMock: RecipeDetailed = {
    img: 'https://opis-cdn.tinkoffjournal.ru/mercury/carbonara-19.mvotyhplpagn..jpg',
    name: 'Chicken-Tortilla Chip Soup',
    description:
        "Chicken-Tortilla Chip Soup could be just the gluten free, dairy free, fodmap friendly, and whole 30 recipe you've been looking for. For $1.09 per serving, you get a main course that serves 8. One portion of this dish contains around 24g of protein, 3g of fat, and a total of 137 calories. 11 person have tried and liked this recipe. Head to the store and pick up carrots, cilantro, bouillon cubes, and a few other things to make it today. It can be enjoyed any time, but it is especially good for Autumn. From preparation to the plate, this recipe takes about 45 minutes. It is brought to you by Foodista. Taking all factors into account, this recipe earns a spoonacular score of 58%, which is good. Tortilla Chip Crusted Chicken with Queso Sauce, Cheese Tortilla Chip Chicken Enchilada Chilaquiles, and Garden Of Eatin’ Tortilla Chip Chicken Strips are very similar to this recipe.",
    healthScore: 75,
    cookingTime: 25,
    prepTime: 15,
    servingsNum: 4,
    ingredients: [
        {
            id: 100,
            name: 'Pasta',
            measures: {
                amount: 200,
                unit: 'grams',
            },
        },
        {
            id: 120,
            name: 'Tomatoes',
            measures: {
                amount: 5,
                unit: 'pieces',
            },
        },
        {
            id: 150,
            name: 'Basil',
            measures: {
                amount: 10,
                unit: 'leaves',
            },
        },
        {
            id: 104,
            name: 'Olive oil',
            measures: {
                amount: 2,
                unit: 'tablespoons',
            },
        },
        {
            id: 101,
            name: 'Garlic',
            measures: {
                amount: 2,
                unit: 'cloves',
            },
        },
    ],
    steps: [
        {
            description:
                'Boil the pasta in salted water according to the package instructions.',
            number: 1,
            time: {
                number: 10,
                unit: 'minutes',
            },
        },
        {
            description:
                'Chop the tomatoes and garlic. Heat olive oil in a pan and sauté garlic until fragrant.',
            number: 2,
        },
        {
            description:
                'Add chopped tomatoes to the pan and cook for another 5 minutes.',
            number: 3,
            time: {
                number: 5,
                unit: 'minutes',
            },
        },
        {
            description:
                'Toss the cooked pasta with the tomato sauce and basil leaves. Serve warm.',
            number: 4,
        },
    ],
};

import { BACKEND } from '@/shared/api';
import { RECIPES_API } from './constants';
import { Recipe } from './index.types';

export async function getRecipeData(id: number): Promise<{
    status: number;
    data: RecipeDetailed;
}>{
    return fetch(BACKEND + RECIPES_API.getById + `${id}}`)
    .then((response)=>{return response.json()})
    .catch(()=>{return {status:1, data: detailedRecipeMock}})
}


const allRecipesMock: {
    status: number;
    data: Recipe[];
} = {
    status: 1,
    data: [
    {
        id: 1,
        name: 'Iced Baklava Cheesecake Latte',
        description:
            'Освежающий латте со вкусом баклавы и чизкейка, идеально подходит для любителей сладкого.',
        img: 'https://www.instagram.com/p/DGRPdKipoMD/',
    },
    {
        id: 2,
        name: 'Marshmallow Tanghulu',
        description:
            'Китайское лакомство с маршмеллоу, покрытое хрустящей карамельной корочкой.',
        img: 'https://tasty.co/recipe/marshmallow-tanghulu',
    },
    {
        id: 3,
        name: 'Shibuya Banana Pudding French Toast',
        description:
            'Французские тосты в стиле Сибуя с банановым пудингом — идеальный завтрак для гурманов.',
        img: 'https://www.pinterest.com/pin/banana-pudding-stuffed-french-toast-happy-homeschool-nest-in-2023--654710864598029338/',
    },
    {
        id: 4,
        name: 'Lobster Pesto Pasta',
        description:
            'Паста с лобстером и песто — изысканное блюдо для особых случаев.',
        img: 'https://gopesto.co.uk/blogs/pasta/lobster',
    },
    {
        id: 5,
        name: 'Chicken Alfredo Soup',
        description:
            'Сливочный суп с курицей Альфредо — комфортная еда в холодные дни.',
        img: 'https://www.staysnatched.com/chicken-alfredo-soup/',
    },
    {
        id: 6,
        name: 'Kiss Me I’m Hydrated Shake',
        description: 'Освежающий коктейль для поддержания гидратации.',
        img: 'https://www.vecteezy.com/vector-art/7324773-kiss-me-i-m-irish-ish-vector-design',
    },
    {
        id: 7,
        name: 'Vietnamese Garlic Noodles',
        description:
            'Вьетнамская лапша с чесноком — простое и ароматное блюдо для любителей азиатской кухни.',
        img: 'https://takestwoeggs.com/vietnamese-garlic-noodles/',
    },
    {
        id: 8,
        name: 'Earl Grey Simple Syrup',
        description:
            'Простой сироп с ароматом Эрл Грей — идеальная добавка к напиткам и десертам.',
        img: 'https://decoratedtreats.com/earl-grey-syrup-tea-flavored-simple-syrup.html',
    },
    {
        id: 9,
        name: 'Onion Tarte Tatin',
        description:
            'Перевернутый луковый пирог — французская классика с карамелизированным луком.',
        img: 'https://tasty.co/recipe/onion-tarte-tatin',
    },
    {
        id: 10,
        name: 'Shamrock Shake Latte',
        description:
            'Латте со вкусом мятного коктейля — праздничный напиток для Дня Святого Патрика.',
        img: 'https://tasty.co/recipe/shamrock-shake-latte',
    },
    {
        id: 11,
        name: 'Strawberry Dubai Chocolate Bark',
        description:
            'Шоколадная корка с клубникой и фисташками — изысканный десерт с ближневосточным акцентом.',
        img: 'https://tasty.co/recipe/strawberry-dubai-chocolate-bark',
    },
    {
        id: 12,
        name: 'Soba Noodles',
        description:
            'Традиционные японские гречневые лапша, подаваемые в холодном бульоне или с соусом.',
        img: 'https://tasty.co/recipe/soba-noodles',
    },
    {
        id: 13,
        name: 'Cobb Salad In A Jar',
        description:
            'Классический салат Кобб, удобно упакованный в банку для легкого перекуса на ходу.',
        img: 'https://tasty.co/recipe/cobb-salad-in-a-jar',
    },
    {
        id: 14,
        name: 'Dr Pepper® Blackberry Pulled Pork Sandwiches',
        description:
            'Сочные сэндвичи с рваной свининой, приготовленной в соусе Dr Pepper® и ежевикой.',
        img: 'https://tasty.co/recipe/dr-pepper-blackberry-pulled-pork-sandwiches',
    },
    {
        id: 15,
        name: 'Prosciutto & Goat Cheese Pizza With Balsamic Glaze',
        description:
            'Пицца с прошутто и козьим сыром, украшенная бальзамической глазурью.',
        img: 'https://tasty.co/recipe/prosciutto-goat-cheese-pizza-with-balsamic-glaze',
    },
    {
        id: 16,
        name: 'Creamy Pesto Eggs',
        description:
            'Сливочные яйца с песто — быстрый и вкусный завтрак или бранч.',
        img: 'https://tasty.co/recipe/creamy-pesto-eggs',
    },
    {
        id: 17,
        name: 'Matcha Latte Jelly',
        description:
            'Желе на основе матча латте — освежающий десерт для любителей зеленого чая.',
        img: 'https://tasty.co/recipe/matcha-latte-jelly',
    },
    {
        id: 18,
        name: 'Air-Fried Bourbon Chicken Skewers',
        description:
            'Куриные шашлычки в бурбонском маринаде, приготовленные в аэрогриле для сочности и аромата.',
        img: 'https://tasty.co/recipe/air-fried-bourbon-chicken-skewers',
    },
    {
        id: 19,
        name: 'Sleepy Girl Gummies',
        description:
            'Жевательные конфеты с натуральными ингредиентами для улучшения сна.',
        img: 'https://tasty.co/recipe/sleepy-girl-gummies',
    },
    {
        id: 20,
        name: 'Creamy Pesto Pasta',
        description:
            'Сливочная паста с песто — быстрое и вкусное блюдо для будничного ужина.',
        img: 'https://tasty.co/recipe/creamy-pesto-pasta',
    },
    ]
}

export async function getRecipesFeed(num: number): Promise<{
    status: number;
    data: Recipe[];
}> {
    return fetch(BACKEND + RECIPES_API.getAll + `?num=${num}`)
    .then((response)=>{return response.json()})
    .catch(()=>allRecipesMock)
}
