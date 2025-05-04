import { getChefbookRecipe } from '@/entities/recipe';
import { FunctionComponent } from 'react';
import { RecipeWithCookingStoreGeneratedContainer } from './index.container.store.generated';

export const RecipeWithCookingApiGeneratedContainer: FunctionComponent<{
    id: number;
}> = async ({ id }) => {
    const { Data: recipe } = await getChefbookRecipe(id);
    return recipe ? (
        <RecipeWithCookingStoreGeneratedContainer
            id={id}
            name={recipe.name}
            description={recipe.description}
            cookingTime={recipe.cookingTimeMinutes}
            servings={recipe.servingsNum}
            ingredients={recipe.ingredients}
            steps={recipe.steps}
        />
    ) : (
        <div>Что-то пошло не так</div>
    );

    return;
};
