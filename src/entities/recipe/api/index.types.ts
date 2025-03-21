export type Recipe = {
    id: number;
    name: string;
    description: string;
    img: string;
};

type Ingredient = {
    id: number;
    name: string;
    image: string;
    localizedName: string;
    // measures: {
    //     amount: number;
    //     unit: string;
    // };
};

type Step = {
    step: string;
    number: number;
    length?: {
        number: number;
        unit: string;
    };
    ingredients: Ingredient[];
};

export type RecipeDetailed = {
    description: string;
    img: string;
    name: string;
    // healthScore: number;
    // cookingTime: number;
    // prepTime: number;
    // servingsNum: number;
    ingredients: Ingredient[];
    steps: Step[];
};
