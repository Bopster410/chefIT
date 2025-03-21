import { Ingredient } from '../lib';

type Step = {
    step: string;
    number: number;
    length?: {
        number: number;
        unit: string;
    };
};

export interface Props {
    id: number;
    img: string;
    name: string;
    description: string;
    healthScore: number;
    cookingTime: number;
    prepTime: number;
    servings: number;
    ingredients: Ingredient[];
    steps: Step[];
}
