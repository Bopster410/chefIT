import { ajaxGet, ajaxPost } from '@/shared/api';
import { RECIPES_API } from './index.constants';
import {
    Ingredient,
    RecipeDetailed,
    Recipe,
    RecipeFilters,
    SelectedFilters,
    Step,
    RecipeDetailedChefbook,
    UserRecipe,
} from './index.types';

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
            diet: filters.diet,
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

export async function getSearchFilters() {
    return await ajaxGet<RecipeFilters>({
        url: RECIPES_API.getFilters,
    });
}

export async function getUserRecipes() {
    const result = await ajaxGet<UserRecipe[]>({
        url: RECIPES_API.getUserRecipes,
        queryParams: { num: 10 },
    });
    return result;
}

export async function generateRecipe(query: string, ingredients: string[]) {
    return await ajaxPost<UserRecipe>({
        url: RECIPES_API.generateNewRecipe,
        body: {
            query: query,
            ingredients: ingredients,
        },
    });
}

export async function getChefbookRecipe(id: number) {
    return await ajaxGet<RecipeDetailedChefbook>({
        url: `${RECIPES_API.chefbookItem}/${id}`,
    });
}

export async function getChefbookRecipeHistory(id: number) {
    return await ajaxGet<RecipeDetailedChefbook[]>({
        url: `${RECIPES_API.chefbookHistory}/${id}/history`,
    });
}

export async function updateChefbookRecipeWithQuery(
    id: number,
    versionId: number,
    query: string
) {
    return await ajaxPost<RecipeDetailedChefbook>({
        url: `${RECIPES_API.chefbookUpdate}/${id}/modern/${versionId}`,
        body: {
            query,
        },
    });
}

export async function setChefbookRecipeMain(id: number, versionId: number) {
    return await ajaxPost<null>({
        url: `${RECIPES_API.chefbookSetMain}/${id}/main/${versionId}`,
    });
}

export async function startChefbookRecipe(id: number) {
    return await ajaxPost<Step>({
        url: RECIPES_API.startChefbookRecipe + `${id}/start`,
    });
}

export async function addFavorite(id:number) {
    return await ajaxPost<null>({
        url: RECIPES_API.addFavorite,
        slugParam: id,
    })
}

export async function removeFavorite(id:number) {
    return await ajaxPost<null>({
        url: RECIPES_API.removeFavorite,
        slugParam: id,
    })
}

export async function getFavorites(page:number) {
    return await ajaxGet<Recipe[]>({
        url: RECIPES_API.getFavorites,
        queryParams: {page:page},
    })
}

export const filtersMock: {
    Status: number;
    Data: RecipeFilters;
} = {
    Status: 200,
    Data: {
        diets: [
            'dairy free',
            'gluten free',
            'vegan',
            'primal',
            'whole 30',
            'pescatarian',
            'fodmap friendly',
            'lacto ovo vegetarian',
            'paleolithic',
            'ketogenic',
        ],
        dishTypes: [
            'starter',
            'side dish',
            'brunch',
            'condiment',
            'dip',
            'beverage',
            'sauce',
            "hor d'oeuvre",
            'lunch',
            'main dish',
            'spread',
            'bread',
            'antipasti',
            'snack',
            'appetizer',
            'main course',
            'dinner',
            'drink',
            'fingerfood',
            'antipasto',
            'dessert',
            'morning meal',
            'breakfast',
            'soup',
            'salad',
        ],
        time: {
            min: 5,
            max: 400,
        },
    },
};

export const useRecipesMock = {
    Status: 200,
    Data: [
        { id: 1, name: 'Спагетти Болоньезе', time: 45 },
        { id: 2, name: 'Цезарь с курицей', time: 20 },
        { id: 3, name: 'Овощное рагу', time: 35 },
        { id: 4, name: 'Борщ украинский', time: 60 },
        { id: 5, name: 'Плов с бараниной', time: 70 },
        { id: 6, name: 'Куриные котлеты', time: 30 },
        { id: 7, name: 'Салат оливье', time: 25 },
        { id: 8, name: 'Запечённая семга', time: 40 },
        { id: 9, name: 'Гречка с грибами', time: 25 },
        { id: 10, name: 'Сырники с изюмом', time: 20 },
    ],
};

export const generatedRecipeMock = {
    Status: 200,
    Data: {
        id: 1,
        description:
            'Простой и вкусный рецепт традиционного итальянского пицца Маргарита с томатами и базиликом. Отличный выбор для ужина с семьей или друзьями.',
        name: 'Пицца Маргарита',
        ingredients: [
            { name: 'Тесто для пиццы', quantity: 1, unit: 'порция' },
            { name: 'Помидоры', quantity: 3, unit: 'шт' },
            { name: 'Моцарелла', quantity: 200, unit: 'г' },
            { name: 'Оливковое масло', quantity: 2, unit: 'ст. ложка' },
            { name: 'Базилик', quantity: 10, unit: 'шт' },
            { name: 'Соль', quantity: 1, unit: 'щепотка' },
            { name: 'Перец черный', quantity: 1, unit: 'щепотка' },
        ],
        steps: [
            {
                step: 1,
                description: 'Разогрейте духовку до 220°C.',
            },
            {
                step: 2,
                description:
                    'Раскатайте тесто для пиццы на плоской поверхности до нужного размера.',
            },
            {
                step: 3,
                description:
                    'На тесто равномерно распределите нарезанные помидоры, посыпьте солью и перцем.',
            },
            {
                step: 4,
                description: 'Нарежьте моцареллу и выложите на пиццу сверху.',
            },
            {
                step: 5,
                description:
                    'Полейте пиццу оливковым маслом и запекайте в духовке 10-15 минут, пока тесто не станет золотистым и хрустящим.',
            },
            {
                step: 6,
                description:
                    'После готовности украсьте пиццу свежими листьями базилика.',
            },
            {
                step: 7,
                description: 'Подавайте горячей с любимым напитком!',
            },
        ],
    },
};

// const allRecipesMock: {
//     Status: number;
//     Data: Recipe[];
// } = {
//     Status: 1,
//     Data: [
//         {
//             id: 1,
//             name: 'Iced Baklava Cheesecake Latte',
//             description:
//                 'Освежающий латте со вкусом баклавы и чизкейка, идеально подходит для любителей сладкого.',
//             img: 'https://www.instagram.com/p/DGRPdKipoMD/',
//         },
//         {
//             id: 2,
//             name: 'Marshmallow Tanghulu',
//             description:
//                 'Китайское лакомство с маршмеллоу, покрытое хрустящей карамельной корочкой.',
//             img: 'https://tasty.co/recipe/marshmallow-tanghulu',
//         },
//         {
//             id: 3,
//             name: 'Shibuya Banana Pudding French Toast',
//             description:
//                 'Французские тосты в стиле Сибуя с банановым пудингом — идеальный завтрак для гурманов.',
//             img: 'https://www.pinterest.com/pin/banana-pudding-stuffed-french-toast-happy-homeschool-nest-in-2023--654710864598029338/',
//         },
//         {
//             id: 4,
//             name: 'Lobster Pesto Pasta',
//             description:
//                 'Паста с лобстером и песто — изысканное блюдо для особых случаев.',
//             img: 'https://gopesto.co.uk/blogs/pasta/lobster',
//         },
//         {
//             id: 5,
//             name: 'Chicken Alfredo Soup',
//             description:
//                 'Сливочный суп с курицей Альфредо — комфортная еда в холодные дни.',
//             img: 'https://www.staysnatched.com/chicken-alfredo-soup/',
//         },
//         {
//             id: 6,
//             name: 'Kiss Me I’m Hydrated Shake',
//             description: 'Освежающий коктейль для поддержания гидратации.',
//             img: 'https://www.vecteezy.com/vector-art/7324773-kiss-me-i-m-irish-ish-vector-design',
//         },
//         {
//             id: 7,
//             name: 'Vietnamese Garlic Noodles',
//             description:
//                 'Вьетнамская лапша с чесноком — простое и ароматное блюдо для любителей азиатской кухни.',
//             img: 'https://takestwoeggs.com/vietnamese-garlic-noodles/',
//         },
//         {
//             id: 8,
//             name: 'Earl Grey Simple Syrup',
//             description:
//                 'Простой сироп с ароматом Эрл Грей — идеальная добавка к напиткам и десертам.',
//             img: 'https://decoratedtreats.com/earl-grey-syrup-tea-flavored-simple-syrup.html',
//         },
//         {
//             id: 9,
//             name: 'Onion Tarte Tatin',
//             description:
//                 'Перевернутый луковый пирог — французская классика с карамелизированным луком.',
//             img: 'https://tasty.co/recipe/onion-tarte-tatin',
//         },
//         {
//             id: 10,
//             name: 'Shamrock Shake Latte',
//             description:
//                 'Латте со вкусом мятного коктейля — праздничный напиток для Дня Святого Патрика.',
//             img: 'https://tasty.co/recipe/shamrock-shake-latte',
//         },
//         {
//             id: 11,
//             name: 'Strawberry Dubai Chocolate Bark',
//             description:
//                 'Шоколадная корка с клубникой и фисташками — изысканный десерт с ближневосточным акцентом.',
//             img: 'https://tasty.co/recipe/strawberry-dubai-chocolate-bark',
//         },
//         {
//             id: 12,
//             name: 'Soba Noodles',
//             description:
//                 'Традиционные японские гречневые лапша, подаваемые в холодном бульоне или с соусом.',
//             img: 'https://tasty.co/recipe/soba-noodles',
//         },
//         {
//             id: 13,
//             name: 'Cobb Salad In A Jar',
//             description:
//                 'Классический салат Кобб, удобно упакованный в банку для легкого перекуса на ходу.',
//             img: 'https://tasty.co/recipe/cobb-salad-in-a-jar',
//         },
//         {
//             id: 14,
//             name: 'Dr Pepper® Blackberry Pulled Pork Sandwiches',
//             description:
//                 'Сочные сэндвичи с рваной свининой, приготовленной в соусе Dr Pepper® и ежевикой.',
//             img: 'https://tasty.co/recipe/dr-pepper-blackberry-pulled-pork-sandwiches',
//         },
//         {
//             id: 15,
//             name: 'Prosciutto & Goat Cheese Pizza With Balsamic Glaze',
//             description:
//                 'Пицца с прошутто и козьим сыром, украшенная бальзамической глазурью.',
//             img: 'https://tasty.co/recipe/prosciutto-goat-cheese-pizza-with-balsamic-glaze',
//         },
//         {
//             id: 16,
//             name: 'Creamy Pesto Eggs',
//             description:
//                 'Сливочные яйца с песто — быстрый и вкусный завтрак или бранч.',
//             img: 'https://tasty.co/recipe/creamy-pesto-eggs',
//         },
//         {
//             id: 17,
//             name: 'Matcha Latte Jelly',
//             description:
//                 'Желе на основе матча латте — освежающий десерт для любителей зеленого чая.',
//             img: 'https://tasty.co/recipe/matcha-latte-jelly',
//         },
//         {
//             id: 18,
//             name: 'Air-Fried Bourbon Chicken Skewers',
//             description:
//                 'Куриные шашлычки в бурбонском маринаде, приготовленные в аэрогриле для сочности и аромата.',
//             img: 'https://tasty.co/recipe/air-fried-bourbon-chicken-skewers',
//         },
//         {
//             id: 19,
//             name: 'Sleepy Girl Gummies',
//             description:
//                 'Жевательные конфеты с натуральными ингредиентами для улучшения сна.',
//             img: 'https://tasty.co/recipe/sleepy-girl-gummies',
//         },
//         {
//             id: 20,
//             name: 'Creamy Pesto Pasta',
//             description:
//                 'Сливочная паста с песто — быстрое и вкусное блюдо для будничного ужина.',
//             img: 'https://tasty.co/recipe/creamy-pesto-pasta',
//         },
//     ],
// };

export type {
    RecipeDetailed,
    Recipe,
    Ingredient,
    Step,
    UserRecipe,
    RecipeDetailedChefbook,
};

interface SearchResponseRaw {
    Status: number;
    Data: {
        recipes: Recipe[];
    };
}

export const searchMock: SearchResponseRaw = {
    Status: 200,
    Data: {
        recipes: [
            {
                id: 652417,
                name: 'Марокканское рагу из нута и чечевицы',
                description:
                    'Марокканский рагу из нута и чечевицы можно приготовить примерно за 30 минут. Этот рецепт без молочных продуктов, подходит для лакто-ово-вегетарианцев и веганов, рассчитан на 3 порции и стоит около 126 рублей за порцию. В одной порции этого основного блюда содержится 466 калорий, 20 г белка и 7 г жира. Рецепт понравился 11 кулинарам. Его можно готовить в любое время года, но особенно хорошо он подходит для осени. Рецепт предоставлен командой ChefIT. Если у вас есть оливковое масло, соль, перец, томатная паста и несколько других ингредиентов, вы сможете его приготовить. В целом, мы решили, что этот рецепт заслуживает оценки ChefIT в 97%. Это отличный результат. Если вам понравился этот рецепт, возможно, вас также заинтересуют другие варианты, такие как марроканское рагу из нута и чечевицы, марроканское рагу с тыквой, нутом и чечевицей.',
                img: 'http://109.120.191.8:8080/api/image/recipe/652417.jpg',
                cookingTime: 10,
            },
            {
                id: 715769,
                name: 'Брокколини и киноа плов',
                description:
                    'Пилаф из киноа с брокколини готовится примерно 30 минут от начала до конца. Порция стоит около 414 рублей, блюдо рассчитано на 2 человек. В одной порции содержится примерно 20 г белка, 31 г жира и всего 625 калорий. Для приготовления понадобятся овощной бульон, лук, оливковое масло и несколько других ингредиентов. Несколько человек уже приготовили этот рецепт, и 94 из них остались довольны. Это довольно дорогой вариант для любителей средиземноморской кухни. Подходит для безглютеновой, безмолочной, лакто-ово-вегетарианской и веганской диеты. Рецепт предоставлен командой ChefIT. С оценкой 98% это блюдо считается отличным. Похожие рецепты: весенние миски с киноа, брокколини и капустой кале, лосось с апельсиново-кунжутным соусом и киноа с брокколини, а также киноа с козьим сыром, мангольдом и запечённой брокколини.',
                img: 'http://109.120.191.8:8080/api/image/recipe/715769.jpg',
                cookingTime: 10,
            },
            {
                id: 664975,
                name: 'Лосось в глазури из васаби и меда',
                description:
                    'Лосось в глазури из васаби и меда — это основное блюдо на 2 порции. Одна порция содержит примерно 35 г белка, 11 г жира и всего 341 калорию. По цене 508 рублей за порцию этот рецепт покрывает 25% суточной нормы витаминов и минералов. 2 человека уже попробовали и оценили этот рецепт. Смесь корня имбиря, меда, пасты васаби и нескольких других ингредиентов делает это блюдо невероятно вкусным. Рецепт предоставлен командой ChefIT. От подготовки до подачи блюдо готовится примерно 20 минут. Это отличный вариант для тех, кто придерживается безглютеновой, безмолочной и пескетарианской диеты. В целом, рецепт получает хорошую оценку команды ChefIT — 79%. Если вам понравился этот рецепт, обратите внимание на похожие варианты: лосось в глазури из васаби и меда, лосось в глазури из васаби и меда, лосось в глазури из васаби и меда.',
                img: 'http://109.120.191.8:8080/api/image/recipe/664975.jpg',
                cookingTime: 10,
            },
            {
                id: 665620,
                name: 'Забайоне с жареными сливами',
                description:
                    'Никогда не бывает слишком много рецептов закусок, так что попробуйте Забайоне с жареными сливами. Этот рецепт рассчитан на 4 порции. Следите за фигурой? В этом безглютеновом, безмолочном и лакто-ово-вегетарианском блюде содержится 239 калорий, 4 г белка и 5 г жира на порцию. По цене 129 рублей за порцию этот рецепт покрывает 8% вашей суточной потребности в витаминах и минералах. Если у вас есть сливы, сахар, кошерная соль и несколько других ингредиентов, вы можете его приготовить. Немногие пробовали этот рецепт, но 7 человек сказали, что он удался. От подготовки до подачи блюдо готовится около 20 минут. Рецепт предоставлен командой ChefIT. С учетом всех факторов этот рецепт получает оценку ChefIT 36%, что не так уж впечатляет. Для похожих рецептов попробуйте жареные сливы, сливы в сахаре или сливы с медом.',
                img: 'http://109.120.191.8:8080/api/image/recipe/665620.jpg',
                cookingTime: 10,
            },
            {
                id: 642346,
                name: 'Египетский салат из цветной капусты',
                description:
                    'Египетский салат из цветной капусты может стать идеальным рецептом для тех, кто ищет блюдо без глютена, молочных продуктов, подходящее для палеодиеты и лакто-ово-вегетарианцев. Этот рецепт рассчитан на 2 порции, каждая из которых содержит 183 калории, 4 г белка и 15 г жира. По цене 151 рубль за порцию этот рецепт покрывает 18% вашей суточной потребности в витаминах и минералах. Рецепт получил высокую оценку от 3 кулинаров. Он отлично подойдет в качестве закуски. Вкус этого блюда достигается благодаря смеси цветной капусты, тмина, петрушки и нескольких других ингредиентов. Рецепт предоставлен командой ChefIT. От подготовки до подачи блюда потребуется примерно 25 минут. С учетом всех факторов мы решили, что этот рецепт заслуживает оценки 93% от команды ChefIT — это отличный результат. Похожие рецепты включают жареную брокколи и цветную капусту, обжаренную говядину с брокколи и грибами шиитаке, а также острый мексиканский салат из черной фасоли и кукурузы.',
                img: 'http://109.120.191.8:8080/api/image/recipe/642346.jpg',
                cookingTime: 10,
            },
        ],
    },
};
