import { Recipe } from "@/entities/recipe";

export interface Props {
  recipes: Recipe[];
  lastRecipeRef: (node: HTMLDivElement | null) => void;
}
