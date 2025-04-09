import { useSearchStore } from "@/app/providers/searchProvider/index.store";
import { CurrentFiltersChips } from "./index.component";
import { SelectedFilters } from "@/entities/recipe/api/index.types";

export function CurrentFiltersChipsContainer() {
  const filters = useSearchStore((state) => state.filters);
  const changeFilters = useSearchStore((state) => state.setFilters);

  function clearFilter(key: keyof SelectedFilters) {
    if (!filters) return;
    const clearedFilters: SelectedFilters = {
      ...filters,
      [key]: key === "time" ? 0 : "",
    };

    changeFilters(clearedFilters);
  }

  return <CurrentFiltersChips clearFilter={clearFilter} filters={filters} />;
}
