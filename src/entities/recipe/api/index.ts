import { ajaxGet, ajaxPost } from '@/shared/api';
import { RECIPES_API } from './index.constants';
import { RecipeDetailed, Recipe, RecipeFilters, SelectedFilters, Step } from './index.types';

export async function getRecipeData(id: number) {
    return await ajaxGet<RecipeDetailed>({
        url: RECIPES_API.getById,
        slugParam: id,
    });
}

export async function getRecipesFeed(num: number) {
    return await ajaxGet<Recipe[]>({
        url: RECIPES_API.getAll,
        queryParams: { num: num },
    });
}

export async function getCurrentCookingRecipe() {
    return await ajaxGet<{ id: number; name: string; currentStep: Step }>({
        url: RECIPES_API.getCookingRecipe,
    });
}

export async function getRecipesSearch(
  query: string,
  filters: SelectedFilters | null
) {
  if (filters === null) {

    return await ajaxGet<{ recipes: Recipe[] }>({
        url: RECIPES_API.search,
        queryParams: { query: query },
    });
  }
  return await ajaxGet<{ recipes: Recipe[] }>({
    url: RECIPES_API.search,
    queryParams: {
      query: query,
      maxTime: filters.time,
      minTime: 0,
      dishType: filters.dishType,
      diet: filters.diet
    },
  });
}

export async function getSearchSuggestions(query: string) {
    return await ajaxGet<{ suggestions: string[] }>({
        url: RECIPES_API.getSuggestions,
        queryParams: { query: query },
    });
}


export async function startRecipe(id: number) {
    console.log(id);
    console.log({ id: id });
    return await ajaxPost<Step>({
        url: RECIPES_API.startRecipe,
        body: { id: id },
    });
}

export async function endRecipe() {
    return await ajaxPost<null>({ url: RECIPES_API.endRecipe });
}

export async function setNextStep() {
    return await ajaxPost<Step>({ url: RECIPES_API.nextStep });
}

export async function setPrevStep() {
    return await ajaxPost<Step>({ url: RECIPES_API.prevStep });
}

export type { RecipeDetailed, Recipe };

export async function getSearchFilters() {
    return await ajaxGet<RecipeFilters>({
        url: RECIPES_API.getFilters,
    });
}

export type { RecipeDetailed, Recipe };

export const filtersMock: {
    Status: number;
    Data: RecipeFilters;
} = {
    Status: 200,
    Data:{
        diets:[
            "dairy free",
            "gluten free",
            "vegan",
            "primal",
            "whole 30",
            "pescatarian",
            "fodmap friendly",
            "lacto ovo vegetarian",
            "paleolithic",
            "ketogenic",
        ],
        dishTypes: [
            "starter",
            "side dish",
            "brunch",
            "condiment",
            "dip",
            "beverage",
            "sauce",
            "hor d'oeuvre",
            "lunch",
            "main dish",
            "spread",
            "bread",
            "antipasti",
            "snack",
            "appetizer",
            "main course",
            "dinner",
            "drink",
            "fingerfood",
            "antipasto",
            "dessert",
            "morning meal",
            "breakfast",
            "soup",
            "salad"
        ],
        time: {
            "min": 5,
            "max": 400
        }
    }
}

const allRecipesMock: {
    Status: number;
    Data: Recipe[];
} = {
    Status: 1,
    Data: [
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
