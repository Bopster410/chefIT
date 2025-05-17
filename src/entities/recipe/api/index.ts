import { ajaxGet, ajaxPost } from '@/shared/api';
import { RECIPES_API } from './index.constants';
import {
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
    const response = await ajaxGet<{
        id: number;
        name: string;
        totalSteps: number;
        currentStep: Step;
    }>({
        url: RECIPES_API.getCookingRecipe,
    });
    return response;
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

export async function getRecipesByType(type: string, page: number) {
    return await ajaxGet<{ recipes: Recipe[] }>({
        url: RECIPES_API.getRecipesByType,
        queryParams: { page: page, dishType: type },
    });
}

export async function getRecipesByDiet(diet: string, page: number) {
    return await ajaxGet<{ recipes: Recipe[] }>({
        url: RECIPES_API.getRecipesByDiet,
        queryParams: { page: page, diet: diet },
    });
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
        url: RECIPES_API.startChefbookRecipe + `/${id}/start`,
    });
}

export async function addFavorite(id: number) {
    return await ajaxPost<null>({
        url: RECIPES_API.addFavorite,
        slugParam: id,
    });
}

export async function removeFavorite(id: number) {
    return await ajaxPost<null>({
        url: RECIPES_API.removeFavorite,
        slugParam: id,
    });
}

export async function getFavorites(page: number) {
    return await ajaxGet<Recipe[]>({
        url: RECIPES_API.getFavorites,
        queryParams: { page: page },
    });
}

export async function getAllCollections() {
    return await ajaxGet<{ id: number; name: string }[]>({
        url: RECIPES_API.getAllCollections,
    });
}

export async function getCollection(id: number, page?: number) {
    const r = await ajaxGet<{ recipes: Recipe[]; lastPageNum: number }>({
        url: RECIPES_API.getCollection,
        slugParam: id,
        queryParams: { page: page ?? 1 },
    });
    console.log(r);
    return r;
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
//                 'Простой сироп с ароматом Эрл Грей — иде"use client";
