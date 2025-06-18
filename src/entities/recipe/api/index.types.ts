export type Recipe = {
  id: number;
  name: string;
  description: string;
  img: string;
  cookingTimeMinutes: number;
  isFavorite?: boolean;
  isGenerated?: boolean;
  createdAt?: string;
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
  cookingTime: number;
  // prepTime: number;
  servingsNum: number;
  ingredients: Ingredient[];
  steps: Step[];
};

export type RecipeChefbook = {
  id: number;
  name: string;
  description: string;
  cookingTime: number;
};

export type RecipeDetailedChefbook = {
  version: number;
  name: string;
  description: string;
  cookingTimeMinutes: number;
  servingsNum: number;
  dishTypes: string[];
  diets: string[];
  ingredients: Ingredient[];
  steps: Step[];
  query: string;
  userIngredients: string[];
};

export type RecipeChefbookHistory = {
  id: number;
  version: number;
  name: string;
  description: string;
  cookingTimeMinutes: number;
  servingsNum: number;
  dishTypes: string[];
  diets: string[];
  steps: Step[];
  ingredients: Ingredient[]; // TODO сейчас нет
  query: string;
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
  cookingTimeMinutes: number;
}
