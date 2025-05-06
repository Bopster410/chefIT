import { RecipeDetailed } from '@/entities/recipe';
import { Ingredient } from './index.types';

export function ingredientsFromRecipe(recipe: RecipeDetailed) {
    const allIngredients: Ingredient[] = [];
    const addedIds = new Map<number, null>();
    recipe.steps.forEach(({ ingredients }) => {
        ingredients.forEach(({ id, name }) => {
            if (addedIds.has(id)) return;

            allIngredients.push({
                id,
                name,
                measures: { amount: 100, unit: 'г' },
            });
            addedIds.set(id, null);
        });
    });

    return allIngredients;
}

export type { Ingredient };
