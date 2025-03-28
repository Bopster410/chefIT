import { getRecipeData } from '@/entities/recipe/api';
import { ingredientsFromRecipe } from '@/pagesss/recipe/lib';
import { RecipePageContainer } from '@/pagesss/recipe';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = parseInt((await params).id);
    const recipe = (await getRecipeData(id)).Data;
    return (
        <RecipePageContainer
            id={id}
            img={''}
            name={recipe.name}
            description={recipe.description}
            healthScore={80}
            cookingTime={40}
            prepTime={10}
            servings={4}
            ingredients={ingredientsFromRecipe(recipe)}
            steps={recipe.steps}
        />
    );
}
