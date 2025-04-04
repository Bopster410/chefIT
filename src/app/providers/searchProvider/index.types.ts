import { Recipe, SelectedFilters } from "@/entities/recipe/api/index.types";

export interface SearchStates {
    query: string,
    filters?: SelectedFilters,
    recipes: Recipe[],

    setQuery: (query:string) => void,
    clearQuery: () => void,
    setFilters: (filters?:SelectedFilters) => void,
    clearFilters: () => void,
    setRecipes: (recipes:Recipe[]) => void,
    clearRecipes: () => void,
  }