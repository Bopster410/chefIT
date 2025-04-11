import { Recipe } from "@/entities/recipe";
import { SelectedFilters } from "@/entities/recipe/api/index.types";
import { MouseEventHandler } from "react";

export interface Props {
  handleSearch?: (params?: {
    query?: string;
    filters?: SelectedFilters;
  }) => void;
  recipes: Recipe[];
  suggestions: string[];
  handleClick: MouseEventHandler<HTMLDivElement>;
  query: string;
}
