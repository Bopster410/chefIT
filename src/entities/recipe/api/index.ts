import { ajaxGet, ajaxPost } from '@/shared/api';
import { RECIPES_API } from './index.constants';
import { RecipeDetailed, Recipe, Step } from './index.types';

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

export async function getRecipesSearch(query: string) {
    return await ajaxGet<{ recipes: Recipe[] }>({
        url: RECIPES_API.search,
        queryParams: { query: query },
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
