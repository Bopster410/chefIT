import { Recipe } from "@/entities/recipe";

export interface Props {
  label: string;
  recipes: Recipe[];
  lastRecipeRef: (node: HTMLDivElement | null) => void;
}
