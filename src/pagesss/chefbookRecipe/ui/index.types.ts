type Ingredient = {
    id: number;
    name: string;
    image: string;
    localizedName: string;
    amount: number;
    unit: string;
};

type Step = {
    step: string;
    number: number;
    length: {
        number: number;
        unit: string;
    } | null;
    ingredients: Ingredient[];
};

export interface Props {
    recipeId: number;
    version: number;
    userIngredients: string[];
    query?: string;
    recipe: {
        description: string;
        name: string;
        cookingTime: number;
        servingsNum: number;
        ingredients: Ingredient[];
        steps: Step[];
    };
}
