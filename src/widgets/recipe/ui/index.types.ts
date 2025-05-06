import { RecipeDescriptionProps } from '@/entities/recipe';
import { CookingRecipeProps } from '@/features/recipeSteps';

export interface ContainerProps extends RecipeDescriptionProps {
    id: number;
}

export interface Props extends CookingRecipeProps, RecipeDescriptionProps {
    id: number;
    cookingState: 'cooking' | 'other' | 'none';
    startCooking: () => void;
}
