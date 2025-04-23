import { UserRecipe } from "@/entities/recipe/api";

export interface Props{
    recipes?: UserRecipe[],
    openModal: () => void,
}