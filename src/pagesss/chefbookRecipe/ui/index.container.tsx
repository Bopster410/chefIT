import { getChefbookRecipe } from '@/entities/recipe/api';
import { FunctionComponent } from 'react';
import { ChefbookRecipe } from './index.component';
export const ChefbookRecipeContainer: FunctionComponent<{
    id: number;
}> = async ({ id }) => {
    const response = await getChefbookRecipe(id);
    const {
        version,
        name,
        description,
        cookingTimeMinutes,
        servingsNum,
        // dishTypes,
        ingredients,
        steps,
        query,
        userIngredients,
    } = response.Data;

    return (
        <ChefbookRecipe
            recipeId={id}
            version={version}
            userIngredients={userIngredients}
            query={query}
            recipe={{
                description: description,
                name: name,
                cookingTime: cookingTimeMinutes,
                servingsNum: servingsNum,
                ingredients: ingredients,
                steps: steps,
            }}
        />
    );
};
