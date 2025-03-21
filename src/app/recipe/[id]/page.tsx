import { getRecipeData } from '@/entities/recipe/api';
import { ingredientsFromRecipe } from '@/pages/recipe/lib';
import { RecipePage } from '@/pages/recipe/ui';

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const recipe = (await getRecipeData(id)).Data;
    return (
        <RecipePage
            id={id}
            img={recipe.img}
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
