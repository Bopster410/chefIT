import { RecipeDetailed } from '@/entities/recipe';
import { Ingredient } from './index.types';

export function ingredientsFromRecipe(recipe: RecipeDetailed) {
    const allIngredients: Ingredient[] = [];
    recipe.steps.forEach(({ ingredients }) => {
        ingredients.forEach(({ id, name }) =>
            allIngredients.push({
                id,
                name,
                measures: { amount: 100, unit: 'г' },
            })
        );
    });

    return allIngredients;
}

export type { Ingredient };
