export type Recipe = {
    id: number;
    name: string;
    description: string;
    img: string;
}

export type Ingredient = {
    id: number;
    name: string;
    measures: {
        amount: number;
        unit: string;
    }
}

export type Step = {
    description: string;
    number: number;
    time?: {
        number: number;
        unit: string;
    },
}

export type RecipeDetailed = {
    img: string;
    name: string;
    description: string;
    healthScore: number;
    cookingTime: number;
    prepTime: number;
    servingsNum: number;
    ingredients: Ingredient[];
    steps: Step[];
}
