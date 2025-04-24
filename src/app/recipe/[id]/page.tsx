import { getRecipeData } from '@/entities/recipe/api';
import { RecipePageContainer } from '@/pagesss/recipe';

export const dynamic = 'force-dynamic'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = parseInt((await params).id);
    const r = await getRecipeData(id);
    console.log(r);
    const recipe = r.Data;
    return (
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
    );
}
