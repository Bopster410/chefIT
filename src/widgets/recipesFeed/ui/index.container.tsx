import { RecipesFeed } from './index.ui';
import { getRecipesFeed } from '@/entities/recipe/api';

export async function RecipesFeedContainer(){
    const recipes = (await getRecipesFeed(10)).data

    return <RecipesFeed recipes={recipes} />;
};
