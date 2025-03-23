import { Recipe } from "@/entities/recipe";
import { MouseEventHandler } from "react";

export interface Props {
    handleSearch: () => void;
    recipes: Recipe[];
    suggestions: string[];
    handleClick: MouseEventHandler<HTMLDivElement>;
}