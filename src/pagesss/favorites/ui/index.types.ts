import { Recipe } from "@/entities/recipe";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Props {
  recipes: Recipe[];
  onAddFavorite?: (id?:number) => void;
  onRemoveFavorite?: (id?:number) => void;
  action?: ReactNode;
  isSnackbarOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  lastRecipeRef: (node: HTMLDivElement | null) => void;
}
