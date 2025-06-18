import { RecipeProps } from '@/entities/recipe/ui/recipeCard';

export interface Props extends RecipeProps{
    likedByDefault?: boolean;
    onRemove?: (id?:number) => void;
}
