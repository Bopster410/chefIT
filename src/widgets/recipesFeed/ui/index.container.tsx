import { RecipesFeed } from './index.component';
import { getRecipesFeed } from '@/entities/recipe';

export async function RecipesFeedContainer() {
    const recipes = (await getRecipesFeed(10)).Data;
    return <RecipesFeed recipes={recipes} />;
}
