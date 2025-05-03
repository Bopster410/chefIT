import { getRecipeData } from '@/entities/recipe/api';
import { RecipePageContainer } from '@/pagesss/recipe';

export const dynamic = 'force-dynamic';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = parseInt((await params).id);
    const { Data: recipe } = await getRecipeData(id);
    return recipe ? (
        <RecipePageContainer
            id={id}
            img={recipe.img}
            name={recipe.name}
            description={recipe.description}
            healthScore={recipe.healthScore}
            cookingTime={40}
            prepTime={10}
            servings={recipe.servingsNum}
            ingredients={recipe.ingredients}
            steps={recipe.steps}
        />
    ) : (
        <div>Что-то пошло не так</div>
    );
}
