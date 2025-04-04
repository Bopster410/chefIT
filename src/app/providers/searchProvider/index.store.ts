import { create } from "zustand";
import { SearchStates } from "./index.types";

export const useSearchStore = create<SearchStates>()((set) => ({
  query: "",
  filters: undefined,
  recipes: [],

  setQuery: (query) => set(() => ({ query: query })),
  clearQuery: () => set(() => ({ query: "" })),

  setFilters: (filters) => set(() => ({ filters: filters })),
  clearFilters: () => set(() => ({ filters: undefined })),

  setRecipes: (recipes) => set(() => ({ recipes: recipes })),
  clearRecipes: () => set(() => ({ recipes: [] })),
}));
