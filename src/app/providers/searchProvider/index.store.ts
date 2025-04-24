import { create } from "zustand";
import { SearchStates } from "./index.types";

export const useSearchStore = create<SearchStates>()((set) => ({
  query: "",
  filters: undefined,
  recipes: [],

  setQuery: (query) => set(() => ({ query: query })),
  clearQuery: () => set(() => ({ query: "" })),

  setFilters: (filters) => set(() => {
    if (!filters) return { filters: undefined };
  
    const hasAnyValue = Object.entries(filters).some(
      ([, value]) => typeof value === "number" ? value !== 0 : value !== ""
    );
  
    return { filters: hasAnyValue ? filters : undefined };
  }),
  
  
  
  clearFilters: () => set(() => ({ filters: undefined })),

  setRecipes: (recipes) => set(() => ({ recipes: recipes })),
  clearRecipes: () => set(() => ({ recipes: [] })),
}));
