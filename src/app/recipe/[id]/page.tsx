import { getRecipeData } from '@/entities/recipe/api';
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
            img={recipe.img}
            name={recipe.name}
            description={recipe.description}
            healthScore={80}
            cookingTime={40}
            prepTime={10}
            servings={4}
            ingredients={recipe.ingredients}
            steps={recipe.steps}
        />
    );
}
