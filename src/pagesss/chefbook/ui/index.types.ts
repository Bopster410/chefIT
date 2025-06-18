import { RecipeProps } from '@/entities/recipe/ui/recipeCard';

export interface Props {
    recipes?: RecipeProps[];
    openModal: () => void;
}
