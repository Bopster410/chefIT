import { Ingredient } from '../lib';

type Step = {
    step: string;
    number: number;
    length: {
        number: number;
        unit: string;
    } | null;
};

export interface ContainerProps {
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
    cookingState: 'cooking' | 'other' | 'none';
    currentStep: Step | null;
    startCooking: () => void;
    endCooking: () => void;
    nextStep: () => void;
    prevStep: () => void;
}
