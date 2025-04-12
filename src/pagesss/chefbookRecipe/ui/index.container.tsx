import { getChefbookRecipe } from '@/entities/recipe/api';
import { FunctionComponent } from 'react';
import { ChefbookRecipe } from './index.component';
export const ChefbookRecipeContainer: FunctionComponent<{
    id: number;
}> = async ({ id }) => {
    const response = await getChefbookRecipe(id);
    const {
        initialQuery,
        neededIngredients,
        recipe: {
            versionId,
            name,
            description,
            cookingTime,
            prepTime,
            servingsNum,
            ingredients,
            steps,
        },
    } = response.Data;

    return (
        <ChefbookRecipe
            versionId={versionId}
            neededIngredients={neededIngredients}
            query={initialQuery}
            recipe={{
                description: description,
                name: name,
                cookingTime: cookingTime,
                prepTime: prepTime,
                servingsNum: servingsNum,
                ingredients: ingredients,
                steps: steps,
            }}
        />
    );
};
