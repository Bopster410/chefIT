import { Recipe } from "@/entities/recipe";

export interface Props {
  recipes: Recipe[];
  onAddFavorite?: (id?: number) => void;
  onRemoveFavorite?: (id?: number) => void;
  lastRecipeRef: (node: HTMLDivElement | null) => void;
}
