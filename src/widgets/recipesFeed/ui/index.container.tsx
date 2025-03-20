import { RecipesFeed } from './index.component';
import { getRecipesFeed } from '@/entities/recipe/api';

export async function RecipesFeedContainer() {
    const recipes = (await getRecipesFeed(10)).data;

    return <RecipesFeed recipes={recipes} />;
}
