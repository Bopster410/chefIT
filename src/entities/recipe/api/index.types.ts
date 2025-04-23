export type Recipe = {
    id: number;
    name: string;
    description: string;
    img: string;
};

export type Ingredient = {
    id: number;
    name: string;
    image: string;
    localizedName: string;
    amount: number;
    unit: string;
};

export type Step = {
    step: string;
    number: number;
    length: {
        number: number;
        unit: string;
    } | null;
    ingredients: Ingredient[];
};

export type RecipeDetailed = {
    description: string;
    img: string;
    name: string;
    healthScore: number;
    // cookingTime: number;
    // prepTime: number;
    servingsNum: number;
    ingredients: Ingredient[];
    steps: Step[];
};

export type RecipeDetailedChefbook = {
    versionId: number;
    description: string;
    name: string;
    // healthScore: number;
    cookingTime: number;
    prepTime: number;
    servingsNum: number;
    ingredients: Ingredient[];
    steps: Step[];
};

export interface RecipeFilters {
    diets: string[];
    dishTypes: string[];
    time: {
        min: number;
        max: number;
    };
}

export interface SelectedFilters {
    diet: string;
    dishType: string;
    time: number;
}

export interface UserRecipe {
    id: number;
    name: string;
    description: string;
    cookingTime: number;
}