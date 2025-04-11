import { SelectedFilters } from "@/entities/recipe/api/index.types";

export interface Props{
    filters: SelectedFilters | undefined;
    clearFilter: (key: keyof SelectedFilters) => void;
}