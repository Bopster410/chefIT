import { getRecipeData } from '@/entities/recipe';
import { FunctionComponent } from 'react';
import { RecipeWithCookingStoreContainer } from './index.container.store';
export const RecipeWithCookingApiContainer: FunctionComponent<{
    id: number;
}> = async ({ id }) => {
    const { Data: recipe } = await getRecipeData(id);
    return recipe ? (
        <RecipeWithCookingStoreContainer
            id={id}
            img={recipe.img}
            name={recipe.name}
            description={recipe.description}
            healthScore={recipe.healthScore}
            cookingTime={recipe.cookingTime}
            servings={recipe.servingsNum}
            ingredients={recipe.ingredients}
            steps={recipe.steps}
        />
    ) : (
        <div>Что-то пошло не так</div>
    );
};
