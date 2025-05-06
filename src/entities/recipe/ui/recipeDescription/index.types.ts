import { Ingredient, Step } from '../../api';

export interface Props {
    img?: string;
    name: string;
    description: string;
    healthScore?: number;
    cookingTime: number;
    servings: number;
    ingredients: Ingredient[];
    steps: Step[];
}
