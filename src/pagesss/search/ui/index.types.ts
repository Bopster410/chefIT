import { Recipe } from "@/entities/recipe";

export interface Props {
    handleSearch: () => void;
    recipes: Recipe[];
    haveSuggestions: boolean;
}